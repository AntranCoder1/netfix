import { loginStart, loginSuccess, loginFailure } from './LoginRedux';
import axios from 'axios';

export const login = async (admin, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", admin);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};