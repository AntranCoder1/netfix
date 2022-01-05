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

export const getUser = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/users", {
            headers: {
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM1NDA1OSwiZXhwIjoxOTAwNTU0MDU5fQ.Jg3rc4EFwWirofSTiglkG9z4k4Ug8K_waK1tgAVbNUI"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM3MjM3OSwiZXhwIjoxOTAwNTcyMzc5fQ.TEZD4Bw2Ehstep1BOd7oaMtG_BAmxJvhQnMNWFKZBc4"
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
                token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTM3MjM3OSwiZXhwIjoxOTAwNTcyMzc5fQ.TEZD4Bw2Ehstep1BOd7oaMtG_BAmxJvhQnMNWFKZBc4"
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