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

export const getList = async (dispatch) => {
    dispatch(getListStart());
    try {
        const res = await axios.get("/lists", {
            headers: {
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM5NTQyNiwiZXhwIjoxOTAwNTk1NDI2fQ.ay9FjQnjV8xLIrBwPcYbs-RAr7m9KsDpZqZVXQe4PkA"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM5NTQyNiwiZXhwIjoxOTAwNTk1NDI2fQ.ay9FjQnjV8xLIrBwPcYbs-RAr7m9KsDpZqZVXQe4PkA"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM5NTQyNiwiZXhwIjoxOTAwNTk1NDI2fQ.ay9FjQnjV8xLIrBwPcYbs-RAr7m9KsDpZqZVXQe4PkA"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTQ0MTM5NiwiZXhwIjoxOTAwNjQxMzk2fQ.4J8HZwoVRnagkiZYr3oIx5sPqpwM1AjsrsfoPLZHd4g"
            },
        });
        dispatch(updatedListSuccess(id, res.data));
    } catch (error) {
        dispatch(updatedListFailure());
    }
};