import { createSlice } from "@reduxjs/toolkit";


export const searchSlice = createSlice({
    name: "search",
    initialState: {
        order: {},
        track: false
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setTrack: (state, action) => {
            state.track = action.payload;
        }
    }
});

export const { setOrder, setTrack } = searchSlice.actions;

export default searchSlice.reducer;
