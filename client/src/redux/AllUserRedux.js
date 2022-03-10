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

        // UPDATE
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.users;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    getAllUserStart, 
    getAllUserSuccess, 
    getAllUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = allUserSlice.actions;

export default allUserSlice.reducer;