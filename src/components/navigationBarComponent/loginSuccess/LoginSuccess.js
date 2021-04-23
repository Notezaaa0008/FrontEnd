import './LoginSuccess.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../../config/axios';
import localStorageService from '../../../services/localStorageService';
import { setIsAuthenticated } from '../../../features/Authenticated/AuthenticatedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../features/Profile/ProfileSlice';
import { setRole } from '../../../features/Login/LoginSlice';


const LoginSuccess = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.userProfile);
    const role = useSelector((state) => state.login.role);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/users/');
                dispatch(setUserProfile(res.data.profile));
            } catch (err) { }
        }
        fetchProfile();
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorageService.clearToken();
        localStorageService.clearRole();
        dispatch(setIsAuthenticated(false));
        dispatch(setRole(false));
        history.push('/');
    }

    return (
        <>
            {role === "CUSTOMER" && <div className="login-success-component">
                <a className="a-component" href="/profile">Hello {userProfile.firstName} {userProfile.lastName}</a>
            </div>}

            {role === "ADMIN" && <div className="login-success-component">
                <a className="a-component">Hello {userProfile.firstName} {userProfile.lastName}</a>
            </div>}

            <div className="login-success-component">
                <a className="a-component" onClick={handleLogout}>Logout</a>
            </div>
        </>
    )
}

export default LoginSuccess;