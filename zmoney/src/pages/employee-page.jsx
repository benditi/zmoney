import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { socketService } from "../services/socket.service"
import { utilsService } from "../services/utils.service"
import { onUpdateEmployee } from '../store/user.action'

export const EmployeePage = () => {
    const [isCountOn, setIsCountOn] = useState(false)
    const [count, setCount] = useState(0);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const clockInterval = useRef();
    const dayInterval = useRef();
    const dispatch = useDispatch();

    let employee = useSelector((state) => {
        return state.user
    })
    useEffect(() => {
        if (isCountOn && count === 0) {
            const dateNow = new Date();
            employee.startingDate = dateNow.getDate().toString();
            dispatch(onUpdateEmployee(employee));
        }
        if (isCountOn) {
            clockInterval.current = setInterval(() => {
                setCount((prevCount) => prevCount + 1)
            }, 1000);
            if (!employee.startSession) {
                employee.startSession = Date.now()
                dispatch(onUpdateEmployee(employee))
            }
        } else if (count > 0 && (!isCountOn)) {
            clearInterval(clockInterval.current)
            employee.totalSessions++;
            const timeDiff = (Date.now() - employee.startSession) / 1000;
            employee.dayCount += timeDiff;
            dispatch(onUpdateEmployee(employee));
            employee.startSession = 0;
            dispatch(onUpdateEmployee(employee));
        };
        // clearing interval after exiting without clicking
        return () => {
            clearInterval(clockInterval.current)
        }
    }, [isCountOn])

    //Check if day has changed to stop count and update user
    useEffect(() => {
        if (isCountOn && count === 0) {
            dayInterval.current = setInterval(() => {
                async function getStoredDate() {
                    const date = employee.startingDate;
                    const nowDate = new Date();
                    // checking if date has changed and clock has stopped
                    if ((date && date !== nowDate.getDate().toString())) {
                        setIsDateChanged(prevState => !prevState);
                    }
                }
                getStoredDate()
            }, 10000);
        }
    }, [isCountOn])
    useEffect(() => {
        //All of this needs to happen only at end of day-
        if (isCountOn) {
            setIsDateChanged(true);
            return;
        }
        if (isDateChanged){
            clearInterval(dayInterval.current);
            const sessionHours = employee.dayCount / 3600;
            employee.totalHours += sessionHours;
            clearInterval(clockInterval.current);
            employee.startSession = 0;
            employee.dayCount = 0;
            dispatch(onUpdateEmployee(employee));
            setCount(0);
            setIsCountOn(false);
        }
    },
        [isDateChanged])

    useEffect(() => {
        return () => {
            clearInterval(dayInterval.current)
        }
    },
        [])
    const navigate = useNavigate();
    //checking if user loggedin while clock allready running
    useEffect(() => {
        if (!employee) {
            navigate('/')
            return
        }
        if (employee.startSession && !isCountOn) {
            setCount(((Date.now() - employee.startSession) / 1000) + employee.dayCount)
            setIsCountOn(true)
        }
    }, [])

    const toggleButton = () => {
        setIsCountOn((prevState) => !prevState);
    }

    //sockets
    useEffect(() => {
        socketService.setup();
        socketService.emit('chat topic', employee._id);
        if (isCountOn) {
            socketService.emit('is working', true);
        } else {
            socketService.emit('is working', false);
        }
    },
        [isCountOn])

    useEffect(() => {
        return () => {
            socketService.terminate()
        }
    }, [])

    if (!employee) return <div>Loading...</div>
    return (
        <section className="employee-page flex column align-center">
            <h1>Hello {employee.fullname}</h1>
            <div>
                <div> Total working hours: {employee.totalHours.toFixed(3)}</div>
                <div> Total sessions: {employee.totalSessions}</div>
                <div>Todays working Time: {utilsService.toHHMMSS(count)}</div>
                <button onClick={() => toggleButton()}>{(isCountOn) ? 'Pause work' : 'Start work'}</button>
            </div>
        </section>
    )
}