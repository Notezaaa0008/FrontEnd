import './FormRegister.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';
import localStorageService from '../../services/localStorageService';
import { setIsAuthenticated } from '../../features/Authenticated/AuthenticatedSlice';
import { useDispatch } from 'react-redux';
import { setRole } from '../../features/Login/LoginSlice';

const FormRegister = () => {
    const [input, setInput] = useState({
        username: '', firstName: '', lastName: '', email: '', password: '',
        confirmPassword: '', address: '', district: '', province: '',
        country: '', postalCode: '', phonNumber: '', BackupPhoneNumber: ''
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }))
    }

    const validateInput = () => {
        const newError = {};
        if (!input.username) newError.username = 'Username is required.';
        if (!input.password) newError.password = 'Password is required.';
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(input.password)))
            newError.password = 'Password must contain at least eight but not more than fifteen characters, Which contain at least one uppercase letters, lowercase letters, numbers, and special characters.';
        if (!input.confirmPassword) newError.confirmPassword = 'confirm password is required.';
        if (input.password !== input.confirmPassword) newError.confirmPassword = 'Confirm password does not match password.'
        if (!input.firstName) newError.firstName = 'First name is required.';
        if (!input.lastName) newError.lastName = 'Last name is required.';
        if (!input.address) newError.address = 'Address is required.';
        if (!input.district) newError.district = 'District is required.';
        if (!input.province) newError.province = 'Province is required.';
        if (!input.country) newError.country = 'Country is required.';
        if (!input.postalCode) newError.postalCode = 'Postal code is required.';
        if (!input.phonNumber) newError.phonNumber = 'Phon number is required.';
        if (!input.email) newError.email = 'email is required.';
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.email)) newError.email = 'Invalid email address.';

        setError(newError);
    }

    const handleFileChange = (e) => {
        // console.log(e.target);
        setFile(e.target.files[0]);
    }

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const formData = new FormData();
            formData.append('image', file);
            formData.append('username', input.username);
            formData.append('firstName', input.firstName);
            formData.append('lastName', input.lastName);
            formData.append('email', input.email);
            formData.append('password', input.password);
            formData.append('confirmPassword', input.confirmPassword);
            formData.append('addressUser', input.address);
            formData.append('districtUser', input.district);
            formData.append('provinceUser', input.province);
            formData.append('countryUser', input.country);
            formData.append('postalCodeUser', input.postalCode);
            formData.append('phone1User', input.phonNumber);
            formData.append('phone2User', input.BackupPhoneNumber);
            formData.append('role', 'CUSTOMER');
            const res = await axios.post('/users/register', formData);
            localStorageService.setToken(res.data.token);
            localStorageService.setRole(res.data.role);
            dispatch(setIsAuthenticated(true));
            dispatch(setRole("CUSTOMER"));
            history.push('/');

        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
            //   console.dir(err);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setInput({
            username: '', firstName: '', lastName: '', email: '', password: '',
            confirmPassword: '', address: '', district: '', province: '',
            country: '', postalCode: '', phonNumber: '', BackupPhoneNumber: ''
        })
        setError({})
    }

    return (
        <form action="" onSubmit={handlerSubmit}>
            {error.server && <span className="register-error" style={{ color: "red" }}>{error.server}</span>}
            <div className="register-input-1">
                <input className="register-input-box1" name="username" type="text" placeholder="Username"
                    value={input.username} onChange={handleInputChange} />
                <input className="register-input-box1" name="email" type="email" placeholder="Email"
                    value={input.email} onChange={handleInputChange} />
            </div>
            {error.username && <span className="register-error" style={{ color: "red" }}>{error.username}</span>}
            {error.email && <span className="register-error" style={{ color: "red" }}>{error.email}</span>}
            <div className="register-input-2">
                <input className="register-input-box1" name="password" type="password" placeholder="Password"
                    value={input.password} onChange={handleInputChange} />
                <input className="register-input-box1" name="confirmPassword" type="password" placeholder="Confirm Password"
                    value={input.confirmPassword} onChange={handleInputChange} />
            </div>
            {error.password && <span className="register-error" style={{ color: "red" }}>{error.password}</span>}
            {error.confirmPassword && <span className="register-error" style={{ color: "red" }}>{error.confirmPassword}</span>}
            <div className="register-input-3">
                <input className="register-input-box1" name="firstName" type="text" placeholder="First Name"
                    value={input.firstName} onChange={handleInputChange} />
                <input className="register-input-box1" name="lastName" type="text" placeholder="Last Name"
                    value={input.lastName} onChange={handleInputChange} />
            </div>
            {error.firstName && <span className="register-error" style={{ color: "red" }}>{error.firstName}</span>}
            {error.lastName && <span className="register-error" style={{ color: "red" }}>{error.lastName}</span>}
            <div className="register-input-4">
                <textarea className="register-input-box2" name="address" type="text" placeholder="Address"
                    value={input.address} onChange={handleInputChange} />
            </div>
            {error.address && <span className="register-error" style={{ color: "red" }}>{error.address}</span>}
            <div className="register-input-5">
                <input className="register-input-box1" name="district" type="text" placeholder="District"
                    value={input.district} onChange={handleInputChange} />
                <input className="register-input-box1" name="province" type="text" placeholder="Province"
                    value={input.province} onChange={handleInputChange} />
            </div>
            {error.district && <span className="register-error" style={{ color: "red" }}>{error.district}</span>}
            {error.province && <span className="register-error" style={{ color: "red" }}>{error.province}</span>}
            <div className="register-input-6">
                <input className="register-input-box1" name="country" type="text" placeholder="Country"
                    value={input.country} onChange={handleInputChange} />
                <input className="register-input-box1" name="postalCode" type="text" placeholder="Postal Code"
                    value={input.postalCode} onChange={handleInputChange} />
            </div>
            {error.country && <span className="register-error" style={{ color: "red" }}>{error.country}</span>}
            {error.postalCode && <span className="register-error" style={{ color: "red" }}>{error.postalCode}</span>}
            <div className="register-input-7">
                <input className="register-input-box1" name="phonNumber" type="text" placeholder="Phone number"
                    value={input.phonNumber} onChange={handleInputChange} />
                <input className="register-input-box1" name="BackupPhoneNumber" type="text" placeholder="Backup phone number"
                    value={input.BackupPhoneNumber} onChange={handleInputChange} />
            </div>
            {error.phonNumber && <span className="register-error" style={{ color: "red" }}>{error.phonNumber}</span>}
            {error.BackupPhoneNumber && <span className="register-error" style={{ color: "red" }}>{error.BackupPhoneNumber}</span>}

            <div className="register-input-8">
                <input type="file" onChange={handleFileChange} />
            </div>

            <div><hr /></div>

            <div className="register-input-9">
                <div>
                    <button className="register-button">SIGN UP</button>
                </div>
                <div>
                    <button className="register-button" type="reset" onClick={handleReset}>RESET</button>
                </div>
            </div>
        </form>
    )
}

export default FormRegister