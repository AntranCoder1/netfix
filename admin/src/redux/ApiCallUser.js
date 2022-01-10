import { 
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updatedUserStart,
    updatedUserSuccess,
    updatedUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
} from './UserRedux';
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root"))?.admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const TOKEN = currentAdmin?.token;

export const getUser = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/users", {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailure());
    }
};

export const updatedUser = async (id, user, dispatch) => {
    dispatch(updatedUserStart());
    try {
        const res = await axios.put(`/users/${id}`, user, {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(updatedUserSuccess(id, res.data));
    } catch (error) {
        dispatch(updatedUserFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + id, {
            headers: {
                token: "Bearer " + TOKEN
            },
        })
        dispatch(deleteUserSuccess(id));
    } catch (error) {
        dispatch(deleteUserFailure());
    }
};

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await axios.post("/auth/register", user);
        dispatch(addUserSuccess(res.data));
    } catch (error) {
        dispatch(addUserFailure());
    }
};