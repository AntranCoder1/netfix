import { 
    getMovieStart, 
    getMovieSuccess, 
    getMovieFailure,
    likeMovieStart,
    likeMovieSuccess,
    likeMovieFailure,
    disLikeMovieStart,
    disLikeMovieSuccess,
    disLikeMovieFailure,
} from './MovieRedux'; 
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = admin && JSON.parse(admin).currentUser;
const TOKEN = currentUser?.token;

export const getMovie = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("/movies", {
            headers: {
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjQ5MzY5MiwiZXhwIjoxOTAxNjkzNjkyfQ.z2TxccXspmUQEn3aNwLZbUsMR9iB6cS-QiFOjvDdB78"
            }
        });
        dispatch(getMovieSuccess(res.data));
    } catch (error) {
        dispatch(getMovieFailure());
    }
};

export const likeMovie = async (dispatch, userId, movieId) => {
    dispatch(likeMovieStart());
    try {
        await axios.patch("/movies/like/" + movieId, { id: userId }, {
            headers: {
                token: "Bearer " + TOKEN
            }
        });
        dispatch(likeMovieSuccess(movieId, userId));
    } catch (error) {
        dispatch(likeMovieFailure());
    }
};

export const disLikeMovie = async (dispatch, userId, movieId) => {
    dispatch(disLikeMovieStart());
    try {
        await axios.patch("/movies/dislike/" + movieId, { id: userId }, {
            headers: {
                token: "Bearer " + TOKEN
            }
        });
        dispatch(disLikeMovieSuccess(movieId, userId));
    } catch (error) {
        dispatch(disLikeMovieFailure());
    }
};