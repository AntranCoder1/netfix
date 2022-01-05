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

        // ADD LIST
        addListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addListSuccess: (state, action) => {
            state.isFetching = false;
            state.lists.push(action.payload);
        },
        addListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DELETE LIST
        deleteListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteListSuccess: (state, action) => {
            state.isFetching = false;
            state.lists.splice(
                state.lists.findIndex((item) => item._id === action.payload), 1
            );
        },
        deleteListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    getListStart,
    getListSuccess,
    getListFailure,
    addListStart,
    addListSuccess,
    addListFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
} = listSlice.actions;

export default listSlice.reducer;