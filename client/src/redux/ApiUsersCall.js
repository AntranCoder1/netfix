import { 
    getAllUserStart, 
    getAllUserSuccess, 
    getAllUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} from './AllUserRedux'; 
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = admin && JSON.parse(admin).currentUser;
const TOKEN = currentUser?.token;

export const getUsers = async (dispatch) => {
    dispatch(getAllUserStart());
    try {
        const res = await axios.get("/users/all", {
            headers: {
                token: "Bearer " + TOKEN
            }
        })
        dispatch(getAllUserSuccess(res.data));
    } catch (error) {
        dispatch(getAllUserFailure());
    }
};

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