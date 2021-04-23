import './AdminPageContainer.css';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useHistory } from 'react-router-dom';
import ListOrderContainer from '../listOrder/ListOrderContainer';


const AdminPageContainer = () => {
    const [all, setAll] = useState(true);
    const [transit, setTransit] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [adminOrderList, setAdminOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPerPage, setOrderPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const fetchAdminOrderList = async () => {
            try {
                const res = await axios.get(`/orders/admin/${'all'}`);
                setAdminOrderList(res.data.orderTmp);
                if (res.data.orderTmp && res.data.orderTmp.length > 0) {
                    const pageNumberTmp = [];
                    for (let i = 1; i <= Math.ceil(res.data.orderTmp.length / orderPerPage); i++) {
                        pageNumberTmp.push(i);
                    };
                    setPageNumber(pageNumberTmp);
                }
            } catch (err) { }
        }
        fetchAdminOrderList();
    }, []);

    const handleNext = () => {
        history.push('/create-order-admin')
    };

    const handleAll = async (e) => {
        try {
            e.preventDefault();
            setAll(true);
            setTransit(false);
            setSuccessful(false);
            setCancel(false);
            const res = await axios.get(`/orders/admin/${'all'}`);
            setAdminOrderList(res.data.orderTmp);
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

    const handleTransit = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(true);
            setSuccessful(false);
            setCancel(false);
            const res = await axios.get(`/orders/admin/${'transit'}`);
            setAdminOrderList(res.data.orderTmp);
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

    const handleSuccessful = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(false);
            setSuccessful(true);
            setCancel(false);
            const res = await axios.get(`/orders/admin/${'successful'}`);
            setAdminOrderList(res.data.orderTmp);
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

    const handleCancel = async (e) => {
        try {
            e.preventDefault();
            setAll(false);
            setTransit(false);
            setSuccessful(false);
            setCancel(true);
            const res = await axios.get(`/orders/admin/${'cancel'}`);
            setAdminOrderList(res.data.orderTmp);
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
    const currentOrder = adminOrderList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (numbers, e) => {
        e.preventDefault();
        setCurrentPage(numbers)
    };

    return (
        <div className="admin-page-container">
            <div className="admin-page-head">
                <div>
                    <h2>Parcel list</h2>
                </div>
                <div className="admin-page-button-box">
                    <button className="admin-page-button-create" onClick={handleNext}>Create</button>
                </div>
            </div>
            <div className="admin-page-link">
                <div className="admin-page-link-box"><a className="admin-page-link-a" href="" onClick={handleAll}>All</a></div>
                <div className="admin-page-link-box"><a className="admin-page-link-a" href="" onClick={handleTransit}>Transit</a></div>
                <div className="admin-page-link-box"><a className="admin-page-link-a" href="" onClick={handleSuccessful}>Successful</a></div>
                <div className="admin-page-link-box"><a className="admin-page-link-a" href="" onClick={handleCancel}>Cancel</a></div>
            </div>
            <div className="admin-page-list">
                {all &&
                    <div className="admin-page-list-inner">
                        {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                    </div>
                }

                {transit &&
                    <div className="admin-page-list-inner">
                        {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                    </div>
                }

                {successful &&
                    <div className="admin-page-list-inner">
                        {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                    </div>
                }

                {cancel &&
                    <div className="admin-page-list-inner">
                        {currentOrder.map((item, index) => <ListOrderContainer key={index} openButton={true} item={item} />)}
                    </div>
                }
            </div>
            <div className="admin-page">
                {pageNumber.map(numbers =>
                    <a className="admin-page-a" onClick={(e) => paginate(numbers, e)} href="!#">
                        {numbers}
                    </a>
                )}
            </div>
        </div>

    )
}

export default AdminPageContainer;