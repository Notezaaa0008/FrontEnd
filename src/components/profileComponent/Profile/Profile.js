import './Profile.css';
import { useState } from 'react';
import EditProfileContainer from '../../../containers/editProfile/EditProfileContainer';
import { useSelector } from "react-redux";
import ChangePasswordComponent from '../../changePasswordComponent/ChangePasswordComponent';

const Profile = () => {
    const [edit, setEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


    const userProfile = useSelector((state) => state.profile.userProfile);


    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setChangePassword(true);

    }

    return (
        <>
            <div>
                {userProfile.pictureProfileUser &&
                    <div className="profile-img-container">
                        <img className="profile-img" src={userProfile.pictureProfileUser} alt="" />
                    </div>
                }

                {!userProfile.pictureProfileUser &&
                    <div className="profile-img-container">
                        <div className="profile-img-none">👪</div>
                    </div>
                }

                <div className="profile-name-container">
                    <div className="profile-name-box">
                        <span>{userProfile.firstName}</span>
                    </div>
                    <div className="profile-name-box">
                        <span>{userProfile.lastName}</span>
                    </div>
                </div>
                <div className="profile-name-container">
                    <div className="profile-name-box">
                        <span>{userProfile.addressUser}</span>
                    </div>
                </div>
                <div className="profile-name-container">
                    <div className="profile-name-box">
                        <span>{userProfile.districtUser}</span>
                    </div>
                    <div className="profile-name-box">
                        <span>{userProfile.provinceUser}</span>
                    </div>
                </div>
                <div className="profile-name-container">
                    <div className="profile-name-box">
                        <span>{userProfile.countryUser}</span>
                    </div>
                    <div className="profile-name-box">
                        <span>{userProfile.postalCodeUser}</span>
                    </div>
                </div>
                <div className="profile-name-container">
                    <div className="profile-name-box">
                        <span>{userProfile.email}</span>
                    </div>
                </div>
            </div>


            <div className="profile-button-container">
                <div className="profile-button-box">
                    <button className="profile-button-edit" onClick={handleEdit}>Edit</button>
                    {edit && <EditProfileContainer setEdit={setEdit} />}
                </div>
                <div className="profile-button-box">
                    <button className="profile-button" onClick={handleChangePassword}>Change Password</button>
                    {changePassword && <ChangePasswordComponent setChangePassword={setChangePassword} />}
                </div>

            </div>
        </>
    )
}

export default Profile;