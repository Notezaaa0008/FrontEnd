import { createSlice } from "@reduxjs/toolkit";
import localStorageService from '../../services/localStorageService';


export const loginSlice = createSlice({
    name: "login",
    initialState: {
        role: localStorageService.getRole()
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }

});

export const { setRole } = loginSlice.actions;

export default loginSlice.reducer;