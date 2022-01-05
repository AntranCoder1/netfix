import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
    name: "list",
    initialState: {
        lists: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // GET ALL LIST
        getListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getListSuccess: (state, action) => {
            state.isFetching = false;
            state.lists = action.payload;
        },
        getListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    getListStart,
    getListSuccess,
    getListFailure,
} = listSlice.actions;

export default listSlice.reducer;