import { useState } from "react"
import { useDispatch } from "react-redux"
import { onAddNewEmployee } from "../store/user.action"

export const EmployeeAdd = ({toggleEmployeeAdd}) => {
    const [fullname, setFullname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const onAddEmployee = async (ev) => {
        if (!password || !phoneNumber || !fullname) return;
        ev.preventDefault()
        const answer = await dispatch(onAddNewEmployee(fullname, phoneNumber, password))
        toggleEmployeeAdd()
    }

    return (
        <section>
            <h1>Add a new employee:</h1>
            <form onSubmit={onAddEmployee}>
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full Name"
                    onChange={(ev) => setFullname(ev.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Phone Number"
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="text"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    required
                    autoFocus
                />
                <button>Submit</button>
            </form>
        </section>
    )
}