import './ProfileContainer.css';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import CreateOrderByUserContainer from '../../containers/createOrderByUser/CreateOrderByUserContainer'
import Profile from '../../components/profileComponent/Profile/Profile';
import ListOrderContainer from '../listOrder/ListOrderContainer';

const ProfileContainer = () => {
    const [popupCreate, setPopupCreate] = useState(false);
    const [all, setAll] = useState(true);
    const [transit, setTransit] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [userOrderList, setUserOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPerPage, setOrderPerPage] = useState(2);
    const [pageNumber, setPageNumber] = useState([]);

    useEffect(() => {
        const fetchUserOrderList = async () => {
            try {
                const res = await axios.get(`/orders/user/${'all'}`);
                setUserOrderList(res.data.orderTmp);
                if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                    const pageNumberTmp = [];
                    for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                    setPageNumber(pageNumberTmp);
                }
            } catch (err) { }
        }
        fetchUserOrderList();
    }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        setPopupCreate(true);
    }

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            setAll(true);
            setTransit(false);
            setSuccessful(false);
            setCancel(false);
            const res = await axios.get(`/orders/user/${'all'}`);
            setUserOrderList(res.data.orderTmp);
            if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                setCurrentPage(1)
                const pageNumberTmp = [];
                for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                    pageNumberTmp.push(i);
                };
                console.log("list", pageNumberTmp);
                setPageNumber(pageNumberTmp);
            }
        } catch (err) { }
    }

    const handleTransit = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(true);
            setSuccessful(false);
            setCancel(false);
            const res = await axios.get(`/orders/user/${'transit'}`);
            setUserOrderList(res.data.orderTmp);
            if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                setCurrentPage(1)
                const pageNumberTmp = [];
                for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                    pageNumberTmp.push(i);
                };
                console.log("list", pageNumberTmp);
                setPageNumber(pageNumberTmp);
            }
        } catch (err) { }
    }

    const handleSuccessful = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(false);
            setSuccessful(true);
            setCancel(false);
            const res = await axios.get(`/orders/user/${'successful'}`);
            setUserOrderList(res.data.orderTmp);
            if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                setCurrentPage(1)
                const pageNumberTmp = [];
                for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                    pageNumberTmp.push(i);
                };
                console.log("list", pageNumberTmp);
                setPageNumber(pageNumberTmp);
            }
        } catch (err) { }
    }

    const handleCancel = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(false);
            setSuccessful(false);
            setCancel(true);
            const res = await axios.get(`/orders/user/${'cancel'}`);
            setUserOrderList(res.data.orderTmp);
            if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                setCurrentPage(1)
                const pageNumberTmp = [];
                for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                    pageNumberTmp.push(i);
                };
                console.log("list", pageNumberTmp);
                setPageNumber(pageNumberTmp);
            }
        } catch (err) { }
    };

    const indexOfLastPost = currentPage * orderPerPage;
    const indexOfFirstPost = indexOfLastPost - orderPerPage;
    const currentOrder = userOrderList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        setCurrentPage(numbers)
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <Profile />
            </div>
            <div className="profile-list-box">
                <div className="profile-list-head">
                    <div>
                        <h2>Parcel list</h2>
                    </div>
                    <div className="profile-button-box">
                        <button className="profile-button-create" onClick={handleCreate}>Create</button>
                        {popupCreate && <CreateOrderByUserContainer setPopupCreate={setPopupCreate} />}
                    </div>
                </div>
                <div className="profile-link">
                    <div className="profile-link-box"><a className="profile-link-a" href="" onClick={handleAll}>All</a></div>
                    <div className="profile-link-box"><a className="profile-link-a" href="" onClick={handleTransit}>Transit</a></div>
                    <div className="profile-link-box"><a className="profile-link-a" href="" onClick={handleSuccessful}>Successful</a></div>
                    <div className="profile-link-box"><a className="profile-link-a" href="" onClick={handleCancel}>Cancel</a></div>
                </div>
                <div className="profile-list">
                    {all &&
                        <div className="profile-list-inner">
                            {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                        </div>
                    }

                    {transit &&
                        <div className="profile-list-inner">
                            {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                        </div>
                    }

                    {successful &&
                        <div className="profile-list-inner">
                            {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                        </div>
                    }

                    {cancel &&
                        <div className="profile-list-inner">
                            {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                        </div>
                    }
                </div>
                <div className="profile-page">
                    {pageNumber.map(numbers =>

                        <a className="profile-page-a" onClick={(e) => paginate(numbers, e)} href="!#">
                            {numbers}
                        </a>

                    )}
                </div>
            </div>

        </div>
    )
}

export default ProfileContainer;