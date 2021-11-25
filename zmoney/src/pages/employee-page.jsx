import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service"
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
            console.log('setting new date');
            const dateNow = new Date();
            userService.setCounterDate(dateNow.getMinutes().toString());
            setIsDateChanged(prevState => !prevState)
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
            console.log('employee.startSession', employee.startSession);
            const timeDiff = (Date.now() - employee.startSession) / 1000;
            console.log('timeDiff', timeDiff);
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
        if (isCountOn && count===0)
        console.log('new day interval');
        dayInterval.current = setInterval(() => {
            console.log('inside interval');
            stopDay();
        }, 10000);
        return () => {
            console.log('cleared interval');
            clearInterval(dayInterval.current)
        }
    }, [isCountOn])

    //checking if user loggedin while clock allready running
    useEffect(() => {
        console.log('only once');
        if (employee.startSession && !isCountOn) {
            setCount(((Date.now() - employee.startSession) / 1000) + employee.dayCount)
            setIsCountOn(true)
        }
    }, [])

    //stopsDay 
    const stopDay = () => {
        async function getStoredDate() {
            const date = await userService.getCounterDate()
            const nowDate = new Date()
            console.log('date', date);
            console.log('nowDate', nowDate);
            //All of this needs to happen only at end of day
            if (date && date !== nowDate.getMinutes().toString()) {
                console.log('day finished');
                // if (isCountOn){
                //     console.log('but clock works');
                //     clearInterval(dayInterval.current);
                //     setIsDateChanged(prevState => !prevState)
                //     return;
                // }
                clearInterval(dayInterval.current);
                console.log('employee.startSession', employee.startSession);
                // const timeDiff = (Date.now() - employee.startSession) / 1000;
                // console.log('timeDiff', timeDiff);
                const sessionHours = employee.dayCount / 3600
                employee.totalHours += sessionHours
                clearInterval(clockInterval.current)
                console.log('employee.totalHours', employee.totalHours);
                employee.startSession = 0;
                employee.dayCount = 0;
                dispatch(onUpdateEmployee(employee))
                setCount(0);
                setIsCountOn(false);
            }
        }
        getStoredDate()
    }

    const toggleButton = () => {
        setIsCountOn((prevState) => !prevState);
    }

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