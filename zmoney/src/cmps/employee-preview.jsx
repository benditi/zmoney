export const EmployeePreview=({employee})=> {
    return (
        <tr>
            <td>{employee.fullname}</td>
            <td>{employee.totalHours.toFixed(2)}</td>
            <td>{employee.totalSessions}</td>
            <td>{(employee.startSession)? 'Working now': 'Not working now'}</td>
        </tr>
    )
}
