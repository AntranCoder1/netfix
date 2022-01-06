import { 
    getMovieStart,
    getMovieSuccess,
    getMovieFailure,
    addMovieStart,
    addMovieSuccess,
    addMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
    updatedMovieStart,
    updatedMovieSuccess,
    updatedMovieFailure,
} from './MovieRedux';
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root")).admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const TOKEN = currentAdmin.token;

export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("/movies", {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(getMovieSuccess(res.data));
    } catch (error) {
        dispatch(getMovieFailure());
    }
};

export const addMovie = async (movie, dispatch) => {
    dispatch(addMovieStart());
    try {
        const res = await axios.post("/movies", movie, {
            headers: {
                token: "Bearer " + TOKEN
            },
        })
        dispatch(addMovieSuccess(res.data));
    } catch (error) {
        dispatch(addMovieFailure());
    }
};

export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("/movies/" + id, {
            headers: {
                token: "Bearer " + TOKEN
            },
        })
        dispatch(deleteMovieSuccess(id));
    } catch (error) {
        dispatch(deleteMovieFailure());
    }
};

export const updatedMovie = async (id, movie, dispatch) => {
    dispatch(updatedMovieStart());
    try {
        const res = await axios.put(`/movies/${id}`, movie, {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(updatedMovieSuccess(id, res.data));
    } catch (error) {
        dispatch(updatedMovieFailure());
    }
};