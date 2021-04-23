import './ListOrder.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import { setRole } from '../../features/Login/LoginSlice';
import UpdateStatusContainer from '../../containers/updateStatus/UpdateStatusContainer';
import CancelComponent from '../../components/cancelComponent/CancelComponent';


const ListOrder = ({ openButton, item }) => {
    const [openList, setOpenList] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [cancelPopup, setCancelPopup] = useState(false);
    const [disableButtonCancel, setDisableButtonCancel] = useState(true);
    const [disableButtonUpdate, setDisableButtonUpdate] = useState(true);

    const isAuthenticated = useSelector((state) => state.authenticated.isAuthenticated);
    const dispatch = useDispatch();
    const role = useSelector((state) => state.login.role);
    const history = useHistory();

    useEffect(() => {
        if (role === "CUSTOMER") {
            console.log("test111")
            const date = new Date();
            const currentDate = `${("0" + (date.getDate() + 1)).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
            const picUp = `${("0" + (new Date(item.pickUpDate).getDate())).slice(-2)}/${("0" + (new Date(item.pickUpDate).getMonth() + 1)).slice(-2)}/${("0" + (new Date(item.pickUpDate).getFullYear())).slice(-2)}`;
            if (currentDate >= picUp || item.status[0].status === "CANCEL") {
                setDisableButtonCancel(false);
            } else {
                setDisableButtonCancel(true);
            };
        };

        if (role === "ADMIN") {
            console.log(item.status[0].status)
            if (item.status[0].status === 'DELIVERY SUCCESSFULLY' || item.status[0].status === 'CANCEL') {
                setDisableButtonUpdate(false);
            } else {
                setDisableButtonUpdate(true);
            };
        };
    }, [item]);

    const handleOpenList = (e) => {
        e.preventDefault();
        setOpenList(true);
    };

    const handleCloseList = (e) => {
        e.preventDefault();
        setOpenList(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdatePopup(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setCancelPopup(true);
    };

    const handleDelete = async (e) => {
        try {
            const res = await axios.delete(`/orders/${item.id}`);
            dispatch(setRole("ADMIN"));
            window.location.reload(true);
        } catch (err) {

        }
    };

    return (
        <>
            <div className="list-order-component">
                <div className="list-order-head-box">
                    <div className="list-order-track">
                        <span>Tracking number:</span>&nbsp;&nbsp;
                        <span>{item.trackingNumber}</span>
                    </div>
                    <div className="list-order-date">
                        <div className="list-order-pickup-date">
                            <span>Pickup date:</span>&nbsp;&nbsp;
                            <span>{`${("0" + (new Date(item.pickUpDate).getDate())).slice(-2)}/${("0" + (new Date(item.pickUpDate).getMonth() + 1)).slice(-2)}/${("0" + (new Date(item.pickUpDate).getFullYear())).slice(-2)}`}</span>
                        </div>
                        <div className="list-order-due-date">
                            <span>Due date:</span>&nbsp;&nbsp;
                            <span>{`${("0" + (new Date(item.dueDate).getDate())).slice(-2)}/${("0" + (new Date(item.dueDate).getMonth() + 1)).slice(-2)}/${("0" + (new Date(item.dueDate).getFullYear())).slice(-2)}`}</span>
                        </div>
                    </div>
                </div>

                <div className="list-order-place-box">
                    <div className="list-order-place-from">
                        <span>From:</span>&nbsp;&nbsp;
                        {item.userId === null &&
                            <span>{item.districtSender}  {item.districtSender}</span>
                        }

                        {item.userId !== null &&
                            <span>{item.userId.districtUser}  {item.userId.districtUser}</span>
                        }


                    </div>
                    <div className="list-order-place-to">
                        <span>To:</span>&nbsp;&nbsp;
                        <span>{item.districtReceiver}  {item.provinceReceiver}</span>
                    </div>
                </div>

                <div className="list-order-list-box">
                    <div className="list-order-inner-list">
                        <div className="list-order-head-list">
                            <div className="list-order-status">
                                Status
                            </div>
                            <div>
                                <div className="list-order-status-button">
                                    {!openList && <button onClick={handleOpenList}>&#9660;</button>}
                                    {openList && <button onClick={handleCloseList}>&#9650;</button>}
                                </div>
                            </div>
                        </div>
                        <div className="list-order-status-box">
                            {!openList && <>
                                <div className="list-order-list-status-box">
                                    <div className="list-order-list-status">
                                        {item.status[0].status}
                                    </div>
                                    {item.status[0].status === "CANCEL" &&
                                        <div className="list-order-list-status-box">
                                            <div className="list-order-list-status">
                                                {`reason cancel: ${item.status[0].reasonForCancellation}`}
                                            </div>
                                            <div className="list-order-list-status">
                                                {`assign: ${item.status[0].assign}`}
                                            </div>

                                        </div>
                                    }
                                    <div className="list-order-list-status-box">
                                        <div className="list-order-list-status">
                                            {`${("0" + (new Date(item.status[0].statusUpdateTime).getDate())).slice(-2)}/${("0" + (new Date(item.status[0].statusUpdateTime).getMonth() + 1)).slice(-2)}/${("0" + (new Date(item.status[0].statusUpdateTime).getFullYear())).slice(-2)}`}
                                        </div>
                                        <div className="list-order-list-status">
                                            {`${("0" + (new Date(item.status[0].statusUpdateTime).getHours())).slice(-2)}:${("0" + (new Date(item.status[0].statusUpdateTime).getMinutes())).slice(-2)}:${("0" + (new Date(item.status[0].statusUpdateTime).getSeconds())).slice(-2)}`}
                                        </div>
                                    </div>
                                </div>

                            </>}
                            {openList && <>
                                <ul className="list-order-list-status">
                                    {item.status.map(value => <li className="list-order-list-li-box">
                                        <div className="list-order-list-status-box">
                                            <div>
                                                {value.status}
                                            </div>
                                            {value.status === "CANCEL" &&
                                                <div className="list-order-list-status-box">
                                                    <div className="list-order-list-status-li">
                                                        {`reason cancel: ${value.reasonForCancellation}`}
                                                    </div>
                                                    <div className="list-order-list-status-li">
                                                        {`assign: ${value.assign}`}
                                                    </div>

                                                </div>
                                            }
                                            <div className="list-order-list-status-box">
                                                <div className="list-order-list-status-li">
                                                    {`${("0" + (new Date(value.statusUpdateTime).getDate())).slice(-2)}/${("0" + (new Date(value.statusUpdateTime).getMonth() + 1)).slice(-2)}/${("0" + (new Date(value.statusUpdateTime).getFullYear())).slice(-2)}`}
                                                </div>
                                                <div className="list-order-list-status-li">
                                                    {`${("0" + (new Date(value.statusUpdateTime).getHours())).slice(-2)}:${("0" + (new Date(value.statusUpdateTime).getMinutes())).slice(-2)}:${("0" + (new Date(value.statusUpdateTime).getSeconds())).slice(-2)}`}
                                                </div>
                                            </div>
                                        </div>
                                    </li>)}
                                </ul>
                            </>}
                        </div>
                    </div>

                    <div className="list-order-button-container">
                        {openButton && isAuthenticated && role === "CUSTOMER" && disableButtonCancel &&
                            <div className="list-order-button-box">
                                <button className="button-cancel" onClick={handleCancel} >Cancel</button>
                                {cancelPopup && <CancelComponent setCancelPopup={setCancelPopup} item={item} />}
                            </div>
                        }

                        {openButton && isAuthenticated && role === "CUSTOMER" && !disableButtonCancel &&
                            <div className="list-order-button-box">
                                <button className="button-cancel-disabled" onClick={handleCancel} disabled>Cancel</button>
                                {cancelPopup && <CancelComponent setCancelPopup={setCancelPopup} item={item} />}
                            </div>
                        }


                        {role === "ADMIN" && disableButtonUpdate &&
                            <>
                                <div className="list-order-button-box">
                                    <button className="button-update" onClick={handleUpdate}>Update</button>
                                    {updatePopup && <UpdateStatusContainer setUpdatePopup={setUpdatePopup} item={item} />}
                                </div>
                                <div className="list-order-button-box">
                                    <button className="button-delete" onClick={handleDelete}>Delete</button>
                                </div>
                            </>
                        }

                        {role === "ADMIN" && !disableButtonUpdate &&
                            <>
                                <div className="list-order-button-box">
                                    <button className="button-cancel-disabled" onClick={handleUpdate} disabled>Update</button>
                                    {updatePopup && <UpdateStatusContainer setUpdatePopup={setUpdatePopup} item={item} />}
                                </div>
                                <div className="list-order-button-box">
                                    <button className="button-delete" onClick={handleDelete}>Delete</button>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListOrder;