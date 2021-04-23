import './EditProfileContainer.css';
import FormEditUser from '../../components/editUserComponent/FormEditUser';

const EditProfileContainer = (props) => {

    const handleClose = (e) => {
        e.preventDefault();
        props.setEdit(false);
    }

    return (
        <div className="popup-edit-user">
            <div className="popup-edit-user-inner">
                <div>
                    <a className="close-edit-user" onClick={handleClose}>&#10006;</a>
                </div>
                <div>
                    <h1>Edit</h1>
                </div>
                <div><hr /></div>
                <div>
                    <FormEditUser />
                </div>
            </div>

        </div>
    )
}

export default EditProfileContainer;