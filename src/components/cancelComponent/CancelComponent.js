import './CancelComponent.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../config/axios';


const CancelComponent = ({ setCancelPopup, item }) => {
    const [reasonForCancellation, setReasonForCancellation] = useState("");
    const [assign, setAssign] = useState("")
    const [error, setError] = useState({});

    const history = useHistory();

    const handleClose = (e) => {
        e.preventDefault();
        setCancelPopup(false);
    }

    const validateInput = () => {
        const newError = {};
        if (!reasonForCancellation) newError.reasonForCancellation = 'Reason cancel is required.';
        if (!assign) newError.assign = 'Assign is required.';
        setError(newError);
    };

    const handleSubmit = async (e) => {
        try {
            validateInput();
            const res = await axios.patch(`/status/${item.id}`, {
                reasonForCancellation, assign,
                status: 'CANCEL'
            });
            history.push('/profile');
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            };
        };
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="popup-cancel">
                <div className="popup-inner-cancel">
                    <div className="popup-cancel-input">
                        <label htmlFor="cancel">Reason Cancel:</label>&nbsp;&nbsp;
                        <input id="cancel" name="reasonForCancellation" type="text" placeholder="Reason Cancel"
                            value={reasonForCancellation} onChange={e => setReasonForCancellation(e.target.value)} />
                    </div>
                    {error.reasonForCancellation && (
                        <span className="help-block" style={{ color: 'red' }}>
                            {error.reasonForCancellation}
                        </span>
                    )}
                    <div className="popup-cancel-input">
                        <label className="popup-cancel-label-assign" htmlFor="cancel">Assign:</label>
                        <input id="cancel" name="assign" type="text" placeholder="Assign"
                            value={assign} onChange={e => setAssign(e.target.value)} />
                    </div>
                    {error.assign && (
                        <span className="help-block" style={{ color: 'red' }}>
                            {error.assign}
                        </span>
                    )}
                    <div className="popup-button-cancel-box">
                        <div>
                            <button className="popup-button-cancel-item">Ok</button>
                        </div>
                        <div>
                            <button className="popup-button-cancel-item" type="button" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CancelComponent;