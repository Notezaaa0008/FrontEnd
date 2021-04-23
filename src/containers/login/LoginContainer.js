import FormLogin from '../../components/loginComponent/FormLogin'
import './LoginContainer.css'

const LoginContainer = (props) => {

    const handleClose = (e) => {
        e.preventDefault();
        props.setPopupLogin(false);
    }

    return (
        <div className="popup-login">
            <div className="popup-inner-login">
                <div>
                    <a className="close-login" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1>Login</h1>
                </div>
                <div><hr /></div>
                <div>
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;