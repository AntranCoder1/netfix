import {
    getListStart,
    getListSuccess,
    getListFailure,
    addListStart,
    addListSuccess,
    addListFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
    updatedListStart,
    updatedListSuccess,
    updatedListFailure,
} from './ListRedux';
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root")).admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const TOKEN = currentAdmin.token;

export const getList = async (dispatch) => {
    dispatch(getListStart());
    try {
        const res = await axios.get("/lists", {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(getListSuccess(res.data));
    } catch (error) {
        dispatch(getListFailure());
    }
};

export const addList = async (list, dispatch) => {
    dispatch(addListStart());
    try {
        const res = await axios.post("/lists", list, {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(addListSuccess(list, res.data));
    } catch (error) {
        dispatch(addListFailure());
    }
};

export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + id, {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(deleteListSuccess(id));
    } catch (error) {
        dispatch(deleteListFailure());
    }
};

export const updatedList = async (id, list, dispatch) => {
    dispatch(updatedListStart());
    try {
        const res = await axios.put(`/lists/${id}`, list, {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(updatedListSuccess(id, res.data));
    } catch (error) {
        dispatch(updatedListFailure());
    }
};