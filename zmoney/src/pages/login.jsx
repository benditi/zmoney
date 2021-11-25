import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onUserLogin } from '../store/user.action'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        (field === 'password') ? setPassword(value) : setPhoneNumber(value);
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogin = async (ev) => {
        if (!password || !phoneNumber) return;
        ev.preventDefault();
        const loggedInUser = await dispatch(onUserLogin(phoneNumber, password))
        if (!loggedInUser) {
            //need to display message
            console.log('Incorrect cradentiels');
            return;
        } else {
            if (loggedInUser.isEmployer) {
                navigate(`/employer`);
            } else {
                navigate(`/employee`);
            }
        }
    }

    return (
        <section className="login flex column align-center">
            <h1>Zmoney- Login</h1>
            <form onSubmit={onLogin}>
                <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Phone Number"
                    onChange={(ev) => handleChange(ev)}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(ev) => handleChange(ev)}
                    required
                />
                <button>Login</button>
            </form>

        </section>
    )
}