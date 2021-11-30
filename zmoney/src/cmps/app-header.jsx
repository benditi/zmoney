import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { onUserLogout } from "../store/user.action" 

export const AppHeader = ()=>{
    let employee = useSelector((state) => {
        return state.user
    })
    const dispatch= useDispatch()
    const navigate = useNavigate();
    const onLogout = ()=>{
        dispatch(onUserLogout())
        navigate('/')
    }
    return (
        <section className="app-header flex justify-space-between align-center">
            <h1>Zmoney</h1>
          {employee && <button onClick={onLogout}>Logout</button>}  
        </section>
    )
}