import './CreateOrderByUserComponent.css';
import { useState } from 'react';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';


const CreateOrderByUserComponent = () => {
    const [createOrderByUser, setCreateOrderByUser] = useState({
        pickUpDate: '',
        fullNameReceiver: '', addressReceiver: '', districtReceiver: '', provinceReceiver: '',
        countryReceiver: 'Thailand', postalCodeReceiver: '', phone1Receiver: '', phone2Receiver: ''
    });
    const [error, setError] = useState({});

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateOrderByUser(prev => ({ ...prev, [name]: value }));
    }

    const validateInput = () => {
        const newError = {};
        if (!createOrderByUser.pickUpDate) newError.pickUpDate = 'Pickup date is required.';
        if (!createOrderByUser.fullNameReceiver) newError.firstName = 'Full name is required.';
        if (!createOrderByUser.addressReceiver) newError.address = 'Address is required.';
        if (!createOrderByUser.districtReceiver) newError.district = 'District is required.';
        if (!createOrderByUser.provinceReceiver) newError.province = 'Province is required.';
        if (!createOrderByUser.countryReceiver) newError.country = 'Country is required.';
        if (!createOrderByUser.postalCodeReceiver) newError.postalCode = 'Postal code is required.';
        if (!createOrderByUser.phone1Receiver) newError.phonNumber = 'PhonNumber is required.';
        setError(newError);
    }

    const handlerSubmit = async (e) => {
        try {
            validateInput();
            const res = await axios.post('/orders/',
                {
                    pickUpDate: createOrderByUser.pickUpDate, fullNameReceiver: createOrderByUser.fullNameReceiver, addressReceiver: createOrderByUser.addressReceiver,
                    districtReceiver: createOrderByUser.districtReceiver, provinceReceiver: createOrderByUser.provinceReceiver,
                    countryReceiver: createOrderByUser.countryReceiver, postalCodeReceiver: createOrderByUser.postalCodeReceiver,
                    phone1Receiver: createOrderByUser.phone1Receiver, phone2Receiver: createOrderByUser.phone2Receiver,
                    status: 'SENDER IS PREPARING PACKAGE'
                });
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
        setCreateOrderByUser({
            fullNameReceiver: '', addressReceiver: '', districtReceiver: '', provinceReceiver: '',
            countryReceiver: 'Thailand', postalCodeReceiver: '', phone1Receiver: '', phone2Receiver: ''
        })
    }

    return (
        <form action="" onSubmit={handlerSubmit}>
            <div className="pickup-date-box">
                <label>Pickup date:</label>&nbsp;&nbsp;
                    <input type="date"
                    min={`${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate() + 1)).slice(-2)}`}
                    name="pickUpDate" value={createOrderByUser.pickUpDate} onChange={handleInputChange} />
            </div>
            {error.pickUpDate && <span className="help-block" style={{ color: "red" }}>{error.pickUpDate}</span>}
            <div><hr /></div>
            <div>
                <h2>Receiver</h2>
            </div>

            <div>
                <div className="create-order-by-user-input-1">
                    <input className="create-order-by-user-input-box1" type="text" name="fullNameReceiver"
                        placeholder="Full name" value={createOrderByUser.fullNameReceiver} onChange={handleInputChange} />
                </div>
                {error.fullNameReceiver && <span className="help-block" style={{ color: "red" }}>{error.fullNameReceiver}</span>}
                <div className="create-order-by-user-input-1">
                    <input className="create-order-by-user-input-box1" type="text" name="addressReceiver"
                        placeholder="Address" value={createOrderByUser.addressReceiver} onChange={handleInputChange} />
                </div>
                {error.addressReceiver && <span className="help-block" style={{ color: "red" }}>{error.addressReceiver}</span>}
                <div className="create-order-by-user-input-2">
                    <input className="create-order-by-user-input-box2" type="text" name="districtReceiver"
                        placeholder="District" value={createOrderByUser.districtReceiver} onChange={handleInputChange} />
                    <input className="create-order-by-user-input-box2" type="text" name="provinceReceiver"
                        placeholder="Province" value={createOrderByUser.provinceReceiver} onChange={handleInputChange} />
                </div>
                {error.districtReceiver && <span className="help-block" style={{ color: "red" }}>{error.districtReceiver}</span>}
                {error.provinceReceiver && <span className="help-block" style={{ color: "red" }}>{error.provinceReceiver}</span>}
                <div className="create-order-by-user-input-2">
                    <input className="create-order-by-user-input-box2" type="text" name="countryReceiver"
                        value={createOrderByUser.countryReceiver} onChange={handleInputChange} />
                    <input className="create-order-by-user-input-box2" type="text" name="postalCodeReceiver"
                        placeholder="Postal code" value={createOrderByUser.postalCodeReceiver} onChange={handleInputChange} />
                </div>
                {error.countryReceiver && <span className="help-block" style={{ color: "red" }}>{error.countryReceiver}</span>}
                {error.postalCodeReceiver && <span className="help-block" style={{ color: "red" }}>{error.postalCodeReceiver}</span>}
                <div className="create-order-by-user-input-2">
                    <input className="create-order-by-user-input-box2" type="text" name="phone1Receiver"
                        placeholder="Phone number" value={createOrderByUser.phone1Receiver} onChange={handleInputChange} />
                    <input className="create-order-by-user-input-box2" type="text" name="phone2Receiver"
                        placeholder="Backup phone number" value={createOrderByUser.phone2Receiver} onChange={handleInputChange} />
                </div>
                {error.phone1Receiver && <span className="help-block" style={{ color: "red" }}>{error.phone1Receiver}</span>}

            </div>
            <div><hr /></div>
            <div className="create-order-by-user-input-3">
                <div>
                    <button className="create-order-by-user-button">CREATE</button>
                </div>
                <div>
                    <button className="create-order-by-user-button" type="reset" onClick={handleReset}>RESET</button>
                </div>
            </div>
        </form>
    )
}

export default CreateOrderByUserComponent;