import { updateUserStart, updateUserFailure, updateUserSuccess } from './AllUserRedux'; 
import axios from 'axios';

const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;

export const updateUsers = async (dispatch, id, user) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put("/users/" + id, user,  {
            headers: {
                token: "Bearer " + TOKEN
            }
        })
        dispatch(updateUserSuccess(id, res.data))
    } catch (error) {
        dispatch(updateUserFailure());
    }
};