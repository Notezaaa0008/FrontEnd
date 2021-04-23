import { createSlice } from "@reduxjs/toolkit";


export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userProfile: {},
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;