import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // GET ALL
        getMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies = action.payload;
        },
        getMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // ADD MOVIE
        addMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.push(action.payload);
        },
        addMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DELETE MOVIE
        deleteMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.splice(
                state.movies.findIndex((item) => item._id === action.payload), 1
            );
        },
        deleteMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    getMovieStart,
    getMovieSuccess,
    getMovieFailure,
    addMovieStart,
    addMovieSuccess,
    addMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
} = movieSlice.actions;

export default movieSlice.reducer;