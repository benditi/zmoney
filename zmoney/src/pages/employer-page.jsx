import { useEffect, useState } from "react"
import { EmployeeList } from "../cmps/employee-list"
import { useDispatch, useSelector } from "react-redux"
import { onGetEmployees } from '../store/user.action'
import { useNavigate } from "react-router"
import { EmployeeAdd } from "../cmps/employee-add"
export const EmployerPage = () => {
    const [isFormShown, setIsFormShown] = useState(false)
    const employees  = useSelector((state)=> 
        {
            return state.employees
        })
    const navigate = useNavigate()
    const employer  = useSelector((state)=> 
        {
            //makes a bug when trying anauthorised routing
            if (state.user?.isEmployer!==true) {
                navigate('./')
                return
            }
            return state.user
        })
    console.log(employees);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onGetEmployees())
    }, [])
    const toggleEmployeeAdd=()=>{
        setIsFormShown((prevState) => !prevState)
    }
    if (!employees.length) return <div>Loading...</div>
    return (
        <section className="employer-page flex column align-center">
            <h1>Hello {employer?.fullname}</h1>
            <EmployeeList employees={employees} />
            <button onClick={toggleEmployeeAdd}>{isFormShown? 'Close' :'Add employee'}</button>
            {isFormShown && <EmployeeAdd toggleEmployeeAdd={toggleEmployeeAdd}/>}
        </section>
    )
}