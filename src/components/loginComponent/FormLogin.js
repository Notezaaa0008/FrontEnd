import './FormLogin.css';
import axios from '../../config/axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import localStorageService from '../../services/localStorageService';
import { setIsAuthenticated } from '../../features/Authenticated/AuthenticatedSlice';
import { setRole } from '../../features/Login/LoginSlice';
import { useDispatch } from "react-redux";



const FormLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const validateInput = () => {
        const newError = {};
        if (!username) newError.username = 'username is required';
        if (!password) newError.password = 'password is required';
        setError(newError);
    };

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const res = await axios.post('/users/login', { username, password });
            localStorageService.setToken(res.data.token);
            localStorageService.setRole(res.data.role);
            dispatch(setIsAuthenticated(true));
            if (res.data.role === "ADMIN") {
                dispatch(setRole("ADMIN"));
                history.push('/admin');
            } else if (res.data.role === "CUSTOMER") {
                dispatch(setRole("CUSTOMER"));
                history.push('/');
            }

        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }


    return (
        <>
            <form action="" onSubmit={handlerSubmit}>
                {error.server && <span className="login-error" style={{ color: "red" }}>{error.server}</span>}
                <div className="login-input-1">
                    <input className="login-input-box" name="username" type="text" placeholder="Username" value={username}
                        onChange={e => setUsername(e.target.value)} />
                    {error.username && (
                        <span className="login-error" style={{ color: 'red' }}>
                            {error.username}
                        </span>
                    )}
                </div>
                <div className="login-input-1">
                    <input className="login-input-box" name="password" type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)} />
                    {error.password && (
                        <span className="login-error" style={{ color: 'red' }}>
                            {error.password}
                        </span>
                    )}
                </div>

                <div className="login-input-2">
                    <button className="login-button">Login</button>
                </div>
            </form>
            <div><hr /></div>
        </>
    )
}

export default FormLogin;