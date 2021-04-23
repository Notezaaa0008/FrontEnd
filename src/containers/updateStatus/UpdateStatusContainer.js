import './UpdateStatusContainer.css'
import FormUpdateStatus from '../../components/updateStatusComponent/FormUpdateStatus';


const UpdateStatusContainer = ({ setUpdatePopup, item }) => {

    const handleClose = (e) => {
        e.preventDefault();
        setUpdatePopup(false);
    }

    return (
        <div className="popup-update-status">
            <div className="popup-inner-update-status">
                <div>
                    <a className="close-update-status" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1>Update status</h1>
                </div>
                <div><hr /></div>
                <div>
                    <FormUpdateStatus item={item} />
                </div>
            </div>
        </div>
    )
}

export default UpdateStatusContainer;