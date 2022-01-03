import { publicRequest, userRequest } from '../requestMethod';
import { loginStart, loginSuccess, loginFailure } from './UserRedux'; 
import { 
    getMovieStart,
    getMovieSuccess,
    getMovieFailure,
} from './MovieRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await publicRequest.get("/movies");
        dispatch(getMovieSuccess(res.data));
    } catch (error) {
        dispatch(getMovieFailure());
    }
};
