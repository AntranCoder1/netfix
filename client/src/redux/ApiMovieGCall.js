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
    getMovieLikeStart,
    getMovieLikeSuccess,
    getMovieLikeFailure
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

export const comment = async (dispatch, movieId, commenterId, commenterUsername, text) => {
    dispatch(addCommentStart());
    try {
        await axios.patch("/movies/comment/" + movieId, { 
            commenterId: commenterId, 
            commenterUsername: commenterUsername, text: text }, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            });
            dispatch(addCommentSuccess(movieId));
    } catch (error) {
        dispatch(addCommentFailure());
    }
};

export const editComment = async (dispatch, movieId, commentId, text) => {
    dispatch(editCommentStart());
    try {
        await axios.patch("/movies/updateComment/" + movieId, { 
            commentId: commentId,
            text: text
        }, {
            headers: {
                token: "Bearer " + TOKEN
            }
        });
        dispatch(editCommentSuccess(movieId, commentId, text));
    } catch (error) {
        dispatch(editCommentFailure());
    }
};

export const deleteComment = async (dispatch, movieId, commentId) => {
    dispatch(deleteCommentStart());
    try {
        await axios.patch("/movies/deleteComment/" + movieId, { commentId: commentId }, {
            headers: {
                token: "Bearer " + TOKEN
            }
        });
        dispatch(deleteCommentSuccess(movieId, commentId));
    } catch (error) {
        dispatch(deleteCommentFailure());
    }
};

export const getMovieLike = async (dispatch, userId) => {
    dispatch(getMovieLikeStart());
    try {
        await axios.get("/getLikeMovie/" + userId, {
            headers: {
                token: "Bearer " + TOKEN
            }
        })
    } catch (error) {
        dispatch(getMovieLikeFailure());
    }
};