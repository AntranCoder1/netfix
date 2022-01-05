import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // GET ALL 
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;