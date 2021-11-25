import { EmployeePreview } from "./employee-preview"

export const EmployeeList = ({ employees }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Total Hours</th>
                    <th>Total sessions</th>
                    <th>Working status</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => {
                    return <EmployeePreview employee={employee} key={employee._id} />
                })}
            </tbody>
        </table>

    )
}