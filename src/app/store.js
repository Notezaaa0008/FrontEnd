import { configureStore } from "@reduxjs/toolkit";
import authenticatedReducer from '../features/Authenticated/AuthenticatedSlice';
import loginReducer from '../features/Login/LoginSlice';
import profileReducer from '../features/Profile/ProfileSlice';
import searchReducer from '../features/Search/SearchSlice';


export default configureStore({
    reducer: {
        authenticated: authenticatedReducer,
        login: loginReducer,
        profile: profileReducer,
        search: searchReducer
    }
});