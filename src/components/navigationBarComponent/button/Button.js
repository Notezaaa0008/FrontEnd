import './Button.css'
import { useState } from 'react';
import LoginContainer from '../../../containers/login/LoginContainer'
import RegisterContainer from '../../../containers/register/RegisterContainer'

const Button = () => {
    const [popupLogin, setPopupLogin] = useState(false);
    const [popupRegister, setPopupRegister] = useState(false);

    const handleOpenLogin = (e) => {
        e.preventDefault();
        setPopupLogin(true);
    };

    const handleOpenRegister = (e) => {
        e.preventDefault();
        setPopupRegister(true);
    };


    return (
        <>
            <div className="button-component">
                <button className="button-signup" onClick={handleOpenRegister}>SIGN UP</button>
                {popupRegister && <RegisterContainer setPopupRegister={setPopupRegister} />}
            </div>
            <div className="button-component">
                <button className="button-login" onClick={handleOpenLogin}>LOGIN</button>
                {popupLogin && <LoginContainer setPopupLogin={setPopupLogin} />}
            </div>

        </>
    );
};

export default Button;