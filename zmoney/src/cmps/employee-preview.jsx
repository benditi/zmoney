import { useEffect, useState } from "react"
import { socketService } from "../services/socket.service"

export const EmployeePreview=({employee})=> {
    const [isWorking, setIsWorking] =useState(false)
    //sockets for updating working status
    useEffect(()=>{
        socketService.setup()
        socketService.emit('chat topic', employee._id)
        socketService.on('is working', changeWorkStatus)
    },[])
    useEffect(()=>{
        return () => {
            socketService.off('is working', changeWorkStatus)
            socketService.terminate()
        }
    },[])
    const changeWorkStatus= (status)=>{
        setIsWorking(status)
    }
    return (
        <tr>
            <td>{employee.fullname}</td>
            <td>{employee.totalHours.toFixed(2)}</td>
            <td>{employee.totalSessions}</td>
            <td>{isWorking?'Working now': 'Not working now'}</td>
            {/* <td>{(employee.startSession)? 'Working now': 'Not working now'}</td> */}
        </tr>
    )
}
