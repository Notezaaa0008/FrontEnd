import './Search.css';
import { useState } from 'react';
import axios from '../../../config/axios';
import { useDispatch } from 'react-redux';
import { setOrder, setTrack } from '../../../features/Search/SearchSlice';


const Search = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [error, setError] = useState({});

    const dispatch = useDispatch();

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`/orders/search/${trackingNumber}`);
            dispatch(setOrder(res.data.order));
            dispatch(setTrack(true));
        } catch (err) {
            if (err.response) {
                setError({ server: err.response.data.message });
            } else {
                setError({ front: err.message });
            }
        }
    }



    return (
        <form action="" onSubmit={handlerSubmit}>
            <div className="search-box">
                <div className="search-input-box">
                    <input className="search-input" name="trackingNumber" type="text" placeholder="Tracking number"
                        value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} />
                </div>
                <div>
                    <button className="search-button">TRACK</button>
                </div>
                {error.server && <span className="search-error" style={{ color: "red" }}>{error.server}</span>}
            </div>
        </form >
    )
}

export default Search;