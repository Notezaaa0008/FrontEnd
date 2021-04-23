import './FormEditUser.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';
import { useSelector } from "react-redux";


const FormEditUser = () => {
    const [input, setInput] = useState({
        firstName: '', lastName: '', email: '', addressUser: '', districtUser: '', provinceUser: '',
        countryUser: '', postalCodeUser: '', phone1User: '', phone2User: ''
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const history = useHistory();
    const userProfile = useSelector((state) => state.profile.userProfile);

    useEffect(() => {
        setInput(userProfile);
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    }

    const validateInput = () => {
        const newError = {};
        if (!input.firstName) newError.firstName = 'First name is required.';
        if (!input.lastName) newError.lastName = 'Last name is required.';
        if (!input.addressUser) newError.addressUser = 'Address is required.';
        if (!input.districtUser) newError.districtUser = 'District is required.';
        if (!input.provinceUser) newError.provinceUser = 'Province is required.';
        if (!input.countryUser) newError.countryUser = 'Country is required.';
        if (!input.postalCodeUser) newError.postalCodeUser = 'Postal code is required.';
        if (!input.phone1User) newError.phone1User = 'Phon number is required.';
        if (!input.email) newError.email = 'email is required.';
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.email)) newError.email = 'Invalid email address.';
        setError(newError);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handlerSubmit = async (e) => {
        try {
            validateInput()
            const formData = new FormData();
            formData.append('image', file);
            formData.append('firstName', input.firstName);
            formData.append('lastName', input.lastName);
            formData.append('email', input.email);
            formData.append('addressUser', input.addressUser);
            formData.append('districtUser', input.districtUser);
            formData.append('provinceUser', input.provinceUser);
            formData.append('countryUser', input.countryUser);
            formData.append('postalCodeUser', input.postalCodeUser);
            formData.append('phone1User', input.phone1User);
            formData.append('phone2User', input.phone2User);
            const res = await axios.patch('/users/', formData);
            history.push('/profile');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
            //   console.dir(err);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        setInput({
            firstName: '', lastName: '', email: '', addressUser: '', districtUser: '', provinceUser: '',
            countryUser: '', postalCodeUser: '', phone1User: '', phone2User: ''
        })
    }

    return (
        <form action="" onSubmit={handlerSubmit}>
            <div className="edit-profile-input-3">
                <input className="edit-profile-input-box1" name="firstName" type="text" placeholder="First Name"
                    value={input.firstName} onChange={handleInputChange} />
                <input className="edit-profile-input-box1" name="lastName" type="text" placeholder="Last Name"
                    value={input.lastName} onChange={handleInputChange} />
            </div>
            {error.firstName && <span className="help-block" style={{ color: "red" }}>{error.firstName}</span>}
            {error.lastName && <span className="help-block" style={{ color: "red" }}>{error.lastName}</span>}
            <div className="edit-profile-input-4">
                <textarea className="edit-profile-input-box2" name="addressUser" type="text" placeholder="Address"
                    value={input.addressUser} onChange={handleInputChange} />
            </div>
            <div className="edit-profile-input-5">
                <input className="edit-profile-input-box1" name="districtUser" type="text" placeholder="District"
                    value={input.districtUser} onChange={handleInputChange} />
                <input className="edit-profile-input-box1" name="provinceUser" type="text" placeholder="Province"
                    value={input.provinceUser} onChange={handleInputChange} />
            </div>
            {error.districtUser && <span className="help-block" style={{ color: "red" }}>{error.districtUser}</span>}
            {error.provinceUser && <span className="help-block" style={{ color: "red" }}>{error.provinceUser}</span>}
            <div className="edit-profile-input-6">
                <input className="edit-profile-input-box1" name="countryUser" type="text" placeholder="Country"
                    value={input.countryUser} onChange={handleInputChange} />
                <input className="edit-profile-input-box1" name="postalCodeUser" type="text" placeholder="Postal Code"
                    value={input.postalCodeUser} onChange={handleInputChange} />
            </div>
            {error.countryUser && <span className="help-block" style={{ color: "red" }}>{error.countryUser}</span>}
            {error.postalCodeUser && <span className="help-block" style={{ color: "red" }}>{error.postalCodeUser}</span>}
            <div className="edit-profile-input-7">
                <input className="edit-profile-input-box1" name="phone1User" type="text" placeholder="Phone number"
                    value={input.phone1User} onChange={handleInputChange} />
                <input className="edit-profile-input-box1" name="phone2User" type="text" placeholder="Backup phone number"
                    value={input.phone2User} onChange={handleInputChange} />
            </div>
            {error.phone1User && <span className="help-block" style={{ color: "red" }}>{error.phone1User}</span>}
            {error.phone2User && <span className="help-block" style={{ color: "red" }}>{error.phone2User}</span>}

            <div className="edit-profile-input-1">
                <input className="edit-profile-input-box3" name="email" type="email" placeholder="Email"
                    value={input.email} onChange={handleInputChange} />
            </div>
            {error.email && <span className="help-block" style={{ color: "red" }}>{error.email}</span>}

            <div className="edit-profile-input-8">
                <input type="file" onChange={handleFileChange} />
            </div>

            <div><hr /></div>

            <div className="edit-profile-input-9">
                <div>
                    <button className="edit-profile-button">Edit</button>
                </div>
                <div>
                    <button className="edit-profile-button" type="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </form>
    )
}

export default FormEditUser;