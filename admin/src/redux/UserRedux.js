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

        // UPDATE USER
        updatedUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updatedUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.user;
        },
        updatedUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DELETE USER
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload), 1
            )
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // ADD USER
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updatedUserStart,
    updatedUserSuccess,
    updatedUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
} = userSlice.actions;

export default userSlice.reducer;