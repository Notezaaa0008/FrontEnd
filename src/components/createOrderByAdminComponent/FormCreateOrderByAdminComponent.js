import './FormCreateOrderByAdminComponent.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';


const FormCreateOrderByAdminComponent = () => {
    const [createOrderByAdmin, setCreateOrderByAdmin] = useState({
        fullNameSender: '', addressSender: '', districtSender: '', provinceSender: '',
        countrySender: 'Thailand', postalCodeSender: '', phone1Sender: '', phone2Sender: '',
        fullNameReceiver: '', addressReceiver: '', districtReceiver: '', provinceReceiver: '',
        countryReceiver: 'Thailand', postalCodeReceiver: '', phone1Receiver: '', phone2Receiver: ''
    })

    const [error, setError] = useState({});

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateOrderByAdmin(prev => ({ ...prev, [name]: value }));
    }

    const validateInput = () => {
        const newError = {};
        if (!createOrderByAdmin.fullNameSender) newError.firstName = 'Full name is required.';
        if (!createOrderByAdmin.addressSender) newError.address = 'Address is required.';
        if (!createOrderByAdmin.districtSender) newError.district = 'District is required.';
        if (!createOrderByAdmin.provinceSender) newError.province = 'Province is required.';
        if (!createOrderByAdmin.countrySender) newError.country = 'Country is required.';
        if (!createOrderByAdmin.postalCodeSender) newError.postalCode = 'Postal code is required.';
        if (!createOrderByAdmin.phone1Sender) newError.phonNumber = 'PhonNumber is required.';

        if (!createOrderByAdmin.fullNameReceiver) newError.firstName = 'Full name is required.';
        if (!createOrderByAdmin.addressReceiver) newError.address = 'Address is required.';
        if (!createOrderByAdmin.districtReceiver) newError.district = 'District is required.';
        if (!createOrderByAdmin.provinceReceiver) newError.province = 'Province is required.';
        if (!createOrderByAdmin.countryReceiver) newError.country = 'Country is required.';
        if (!createOrderByAdmin.postalCodeReceiver) newError.postalCode = 'Postal code is required.';
        if (!createOrderByAdmin.phone1Receiver) newError.phonNumber = 'PhonNumber is required.';
        setError(newError);
    }

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            validateInput();
            const res = await axios.post('/orders/',
                {
                    fullNameSender: createOrderByAdmin.fullNameSender, addressSender: createOrderByAdmin.addressSender,
                    districtSender: createOrderByAdmin.districtSender, provinceSender: createOrderByAdmin.provinceSender,
                    countrySender: createOrderByAdmin.countrySender, postalCodeSender: createOrderByAdmin.postalCodeSender,
                    phone1Sender: createOrderByAdmin.phone1Sender, phone2Sender: createOrderByAdmin.phone2Sender,
                    fullNameReceiver: createOrderByAdmin.fullNameReceiver, addressReceiver: createOrderByAdmin.addressReceiver,
                    districtReceiver: createOrderByAdmin.districtReceiver, provinceReceiver: createOrderByAdmin.provinceReceiver,
                    countryReceiver: createOrderByAdmin.countryReceiver, postalCodeReceiver: createOrderByAdmin.postalCodeReceiver,
                    phone1Receiver: createOrderByAdmin.phone1Receiver, phone2Receiver: createOrderByAdmin.phone2Receiver,
                    status: 'SHIPMENT DROP OFF'
                });
            history.push('/admin');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        };
    };

    const handleReset = (e) => {
        e.preventDefault();
        setCreateOrderByAdmin({
            fullNameSender: '', addressSender: '', districtSender: '', provinceSender: '',
            countrySender: 'Thailand', postalCodeSender: '', phone1Sender: '', phone2Sender: '',
            fullNameReceiver: '', addressReceiver: '', districtReceiver: '', provinceReceiver: '',
            countryReceiver: 'Thailand', postalCodeReceiver: '', phone1Receiver: '', phone2Receiver: ''
        })
    }

    return (
        <>
            <form action="" onSubmit={handlerSubmit}>
                <div className="create-order-admin">
                    <fieldset className="create-order-admin-field">
                        <legend><h2>Sender</h2></legend>
                        <div className="create-order-admin-box-input">
                            <label htmlFor="fullName">Full name:</label>
                            <input className="create-order-admin-input" id="fullName" type="text" name="fullNameSender" placeholder="Full name"
                                value={createOrderByAdmin.fullNameSender} onChange={handleInputChange} />
                        </div>
                        {error.fullNameSender && <span className="help-block" style={{ color: "red" }}>{error.fullNameSender}</span>}
                        <div className="create-order-admin-box-input">
                            <label htmlFor="address">Address:</label>
                            <textarea className="create-order-admin-input" id="address" type="text" name="addressSender" placeholder="Address"
                                value={createOrderByAdmin.addressSender} onChange={handleInputChange} />
                        </div>
                        {error.addressSender && <span className="help-block" style={{ color: "red" }}>{error.addressSender}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="district">District:</label>
                                <input className="create-order-admin-input" id="district" type="text" name="districtSender" placeholder="District"
                                    value={createOrderByAdmin.districtSender} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="province">Province:</label>
                                <input className="create-order-admin-input" id="province" type="text" name="provinceSender" placeholder="Province"
                                    value={createOrderByAdmin.provinceSender} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.districtSender && <span className="help-block" style={{ color: "red" }}>{error.districtSender}</span>}
                        {error.provinceSender && <span className="help-block" style={{ color: "red" }}>{error.provinceSender}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="country">Country:</label>
                                <input className="create-order-admin-input" id="country" type="text" name="countrySender" value="Thailand"
                                    value={createOrderByAdmin.countrySender} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="postalCode">Postal code:</label>
                                <input className="create-order-admin-input" id="postalCode" type="text" name="postalCodeSender" placeholder="Postal code"
                                    value={createOrderByAdmin.postalCodeSender} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.countrySender && <span className="help-block" style={{ color: "red" }}>{error.countrySender}</span>}
                        {error.postalCodeSender && <span className="help-block" style={{ color: "red" }}>{error.postalCodeSender}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="phone1">Phone number:</label>
                                <input className="create-order-admin-input" id="phone1" type="text" name="phone1Sender" placeholder="Phone number"
                                    value={createOrderByAdmin.phone1Sender} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="phone2">Backup phone number:</label>
                                <input className="create-order-admin-input" id="phone2" type="text" name="phone2Sender" placeholder="Backup phone number"
                                    value={createOrderByAdmin.phone2Sender} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.phone1Sender && <span className="help-block" style={{ color: "red" }}>{error.phone1Sender}</span>}
                        {error.phone2Sender && <span className="help-block" style={{ color: "red" }}>{error.phone2Sender}</span>}
                    </fieldset>

                    <fieldset className="create-order-admin-field">
                        <legend><h2>Receiver</h2></legend>
                        <div className="create-order-admin-box-input">
                            <label htmlFor="fullNamer">Full name</label>
                            <input className="create-order-admin-input" id="fullNamer" type="text" name="fullNameReceiver" placeholder="Full name"
                                value={createOrderByAdmin.fullNameReceiver} onChange={handleInputChange} />
                        </div>
                        {error.fullNameReceiver && <span className="help-block" style={{ color: "red" }}>{error.fullNameReceiver}</span>}
                        <div className="create-order-admin-box-input">
                            <label htmlFor="addressr">Address</label>
                            <textarea className="create-order-admin-input" id="addressr" type="text" name="addressReceiver" placeholder="Address"
                                value={createOrderByAdmin.addressReceiver} onChange={handleInputChange} />
                        </div>
                        {error.addressReceiver && <span className="help-block" style={{ color: "red" }}>{error.addressReceiver}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="districtr">District</label>
                                <input className="create-order-admin-input" id="districtr" type="text" name="districtReceiver" placeholder="District"
                                    value={createOrderByAdmin.districtReceiver} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="provincer">Province</label>
                                <input className="create-order-admin-input" id="provincer" type="text" name="provinceReceiver" placeholder="Province"
                                    value={createOrderByAdmin.provinceReceiver} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.districtReceiver && <span className="help-block" style={{ color: "red" }}>{error.districtReceiver}</span>}
                        {error.provinceReceiver && <span className="help-block" style={{ color: "red" }}>{error.provinceReceiver}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="countryr">Country</label>
                                <input className="create-order-admin-input" id="countryr" type="text" name="countryReceiver" value="Thailand"
                                    value={createOrderByAdmin.countryReceiver} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="postalCoder">Postal code</label>
                                <input className="create-order-admin-input" id="postalCoder" type="text" name="postalCodeReceiver" placeholder="Postal code"
                                    value={createOrderByAdmin.postalCodeReceiver} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.countryReceiver && <span className="help-block" style={{ color: "red" }}>{error.countryReceiver}</span>}
                        {error.postalCodeReceiver && <span className="help-block" style={{ color: "red" }}>{error.postalCodeReceiver}</span>}

                        <div className="create-order-admin-box">
                            <div className="create-order-admin-box-input">
                                <label htmlFor="phone1r">Phone number</label>
                                <input className="create-order-admin-input" id="phone1r" type="text" name="phone1Receiver" placeholder="Phone number"
                                    value={createOrderByAdmin.phone1Receiver} onChange={handleInputChange} />
                            </div>
                            <div className="create-order-admin-box-input">
                                <label htmlFor="phone2r">Backup phone number</label>
                                <input className="create-order-admin-input" id="phone2r" type="text" name="phone2Receiver" placeholder="Backup phone number"
                                    value={createOrderByAdmin.phone2Receiver} onChange={handleInputChange} />
                            </div>
                        </div>
                        {error.phone1Receiver && <span className="help-block" style={{ color: "red" }}>{error.phone1Receiver}</span>}
                        {error.phone2Receiver && <span className="help-block" style={{ color: "red" }}>{error.phone2Receiver}</span>}
                    </fieldset>

                    <div className="create-order-admin-button-box">
                        <div>
                            <button className="create-order-admin-button">CREATE</button>
                        </div>
                        <div>
                            <button className="create-order-admin-button" type="reset" onClick={handleReset}>RESET</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormCreateOrderByAdminComponent;