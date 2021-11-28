import { useEffect, useState } from "react"
import { socketService } from "../services/socket.service"

export const EmployeePreview=({employee})=> {
    const [isWorking, setIsWorking] =useState(false)
    // initial check, to update if employee is working but not logged in
    useEffect(()=>{
        const workingStatus = (employee.startSession)? true:false;
        setIsWorking(workingStatus)
    },[])
    //sockets for updating working status of logged in employees
    useEffect(()=>{
        console.log('setup socket', employee._id);
        socketService.setup()
        socketService.emit('chat topic', employee._id)
        socketService.on('is working', changeWorkStatus)
    },[])
    useEffect(()=>{
        return () => {
            console.log('closed socket');
            socketService.off('is working', changeWorkStatus)
            socketService.terminate()
        }
    },[])
    const changeWorkStatus=(status)=>{
        console.log('changing status to:', status);
        setIsWorking(status)
    }
    return (
        <tr>
            <td>{employee.fullname}</td>
            <td>{employee.totalHours.toFixed(2)}</td>
            <td>{employee.totalSessions}</td>
            <td>{isWorking?'Working now': 'Not working now'}</td>
        </tr>
    )
}
