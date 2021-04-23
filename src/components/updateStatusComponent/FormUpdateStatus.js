import { useState } from 'react';
import './FormUpdateStatus.css';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';
import { useDispatch } from "react-redux";
import { setRole } from '../../features/Login/LoginSlice';


const FormUpdateStatus = ({ item }) => {
    const [status, setStatus] = useState("");
    const [error, setError] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setStatus(e.target.value);
    }


    const handleSubmit = async (e) => {
        try {
            const res = await axios.patch(`/status/${item.id}`, { status });
            dispatch(setRole("ADMIN"));
            history.push("/admin");

        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    return (
        <>
            <div className="update-status-header">
                <label>Tracking number:</label>&nbsp;&nbsp;
                <span>{item.trackingNumber}</span>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className="update-status-select">
                    <label htmlFor="">Status:</label>&nbsp;&nbsp;
                    <select name="Status" id="" onChange={handleChange}>
                        <option name="SHIPMENT DROP OFF" value="SHIPMENT DROP OFF" selected> SHIPMENT DROP OFF</option>
                        <option name="SHIPMENT PICK UP" value="SHIPMENT PICK UP" > SHIPMENT PICK UP</option>
                        <option name="ARRIVED AT TRANSIT STATION" value="ARRIVED AT TRANSIT STATION" > ARRIVED AT TRANSIT STATION</option>
                        <option name="ARRIVED AT DESTINATION STATION" value="ARRIVED AT DESTINATION STATION" > ARRIVED AT DESTINATION STATION</option>
                        <option name="OUT FOR DELIVERY" value="OUT FOR DELIVERY" > OUT FOR DELIVERY</option>
                        <option name="DELIVERY UNSUCCESSFUL DUE TO CANNOT CONTACT" value="DELIVERY UNSUCCESSFUL DUE TO CANNOT CONTACT" > DELIVERY UNSUCCESSFUL DUE TO CANNOT CONTACT</option>
                        <option name="DELIVERY SUCCESSFULLY" value="DELIVERY SUCCESSFULLY" > DELIVERY SUCCESSFULLY</option>
                    </select>
                </div>

                <div className="update-status-button">
                    <button className="update-status-button-update">Update</button>
                </div>
            </form>

        </>
    )
}

export default FormUpdateStatus;