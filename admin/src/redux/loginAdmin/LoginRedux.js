import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'admin',
    initialState: {
        currentAdmin: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        // LOGIN
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentAdmin = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // LOGOUT
        logout: (state) => {
            state.currentAdmin = null
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = loginSlice.actions;

export default loginSlice.reducer;