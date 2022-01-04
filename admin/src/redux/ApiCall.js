import { 
    getMovieStart,
    getMovieSuccess,
    getMovieFailure,
    addMovieStart,
    addMovieSuccess,
    addMovieFailure
} from './MovieRedux';
import axios from 'axios';

export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await axios.get("/movies", {
            headers: {
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTI2OTc3OCwiZXhwIjoxOTAwNDY5Nzc4fQ.FAHxMRuGnrXVsfkjODTMlXuAbKte_0gD1PNdttNcdAg"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTI2OTc3OCwiZXhwIjoxOTAwNDY5Nzc4fQ.FAHxMRuGnrXVsfkjODTMlXuAbKte_0gD1PNdttNcdAg"
            },
        })
        dispatch(addMovieSuccess(res.data));
    } catch (error) {
        dispatch(addMovieFailure());
    }
}