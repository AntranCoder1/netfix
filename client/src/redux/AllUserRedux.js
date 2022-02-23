import { createSlice } from '@reduxjs/toolkit';

const allUserSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getAllUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getAllUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    getAllUserStart, 
    getAllUserSuccess, 
    getAllUserFailure,
} = allUserSlice.actions;

export default allUserSlice.reducer;