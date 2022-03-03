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
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    editCommentStart,
    editCommentSuccess,
    editCommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure,
} from './MovieRedux'; 
import axios from 'axios';

const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;

export const getMovie = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("/movies", {
            headers: {
                token: "Bearer " + TOKEN
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