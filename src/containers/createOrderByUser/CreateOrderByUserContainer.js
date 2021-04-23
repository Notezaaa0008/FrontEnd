import CreateOrderByUserComponent from '../../components/createOrderByUserComponent/CreateOrderByUserComponent'
import './CreateOrderByUserContainer.css'

const CreateOrderByUserContainer = (props) => {

    const handleClose = (e) => {
        e.preventDefault();
        props.setPopupCreate(false);
    }

    return (
        <div className="popup-create-order-by-user">
            <div className="popup-inner-create-order-by-user">
                <a className="close-create-order-by-user" onClick={handleClose}>&#10006;</a>
                <div>
                    <CreateOrderByUserComponent />
                </div>
            </div>

        </div>
    )
}

export default CreateOrderByUserContainer;