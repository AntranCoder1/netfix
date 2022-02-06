import { getMovieStart, getMovieSuccess, getMovieFailure } from './MovieRedux'; 
import axios from 'axios';
export const ADD_COMMENT = "ADD_COMMENT";

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
