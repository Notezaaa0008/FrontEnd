import './ChangePasswordComponent.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';
import localStorageService from '../../services/localStorageService';
import { setIsAuthenticated } from '../../features/Authenticated/AuthenticatedSlice';
import { useDispatch } from "react-redux";



const ChangePasswordComponent = ({ setChangePassword }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClose = (e) => {
        e.preventDefault();
        setChangePassword(false);
    }

    const validateInput = () => {
        const newError = {};
        if (!newPassword) newError.newPassword = 'Reason cancel is required.';
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(newPassword)))
            newError.newPassword = 'New password must contain at least eight but not more than fifteen characters, Which contain at least one uppercase letters, lowercase letters, numbers, and special characters.';
        if (!confirmNewPassword) newError.confirmNewPassword = 'Assign is required.';
        if (confirmNewPassword !== newPassword) newError.confirmNewPassword = 'Confirm new password does not match new password.';
        setError(newError);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const res = await axios.put('/users/', { newPassword, confirmNewPassword });
            localStorageService.clearToken();
            dispatch(setIsAuthenticated(false));
            history.push('/');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }


    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="popup-change-password">
                <div className="popup-inner-change-password">
                    <div className="popup-change-password-input">
                        <label className="popup-change-password-label-assign" htmlFor="cancel">New password:</label>&nbsp;&nbsp;
                        <input name="newPassword" type="password" placeholder="New password"
                            value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    {error.newPassword && (
                        <span className="change-password-error" style={{ color: 'red' }}>
                            {error.newPassword}
                        </span>
                    )}
                    <div className="popup-change-password-input">
                        <label htmlFor="cancel">Confirm new password:</label>&nbsp;&nbsp;
                        <input name="confirmNewPassword" type="password" placeholder="Confirm new password"
                            value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                    </div>
                    {error.confirmNewPassword && (
                        <span className="change-password-error" style={{ color: 'red' }}>
                            {error.confirmNewPassword}
                        </span>
                    )}

                    <div className="popup-button-change-password-box">
                        <div>
                            <button className="popup-button-change-password-item">Ok</button>
                        </div>
                        <div>
                            <button className="popup-button-change-password-item" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default ChangePasswordComponent;