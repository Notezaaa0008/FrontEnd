import FormRegister from '../../components/registerComponent/FormRegister'
import './RegisterContainer.css'

const RegisterContainer = (props) => {

    const handleCloseRegister = (e) => {
        e.preventDefault();
        props.setPopupRegister(false);
    }

    return (
        <div className="popup-register">
            <div className="popup-inner-register">
                <div>
                    <a className="close-register" onClick={handleCloseRegister}>&#10006;</a>
                </div>
                <div>
                    <h1>Register</h1>
                </div>
                <div><hr /></div>
                <div className="popup-form-register">
                    <FormRegister />
                </div>
            </div>
        </div>
    )
};

export default RegisterContainer;