import { 
    getFeedbackStart, 
    getFeedbackSuccess, 
    getFeedbackFailure ,
    deleteFeedbackStart,
    deleteFeedbackSuccess,
    deleteFeedbackFailure,
} from './FeedbackRedux';
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root"))?.admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const TOKEN = currentAdmin?.token;

export const getFeedback = async (dispatch) => {
    dispatch(getFeedbackStart());
    try {
        const res = await axios.get("/feedback", {
            headers: {
                token: "Bearer " + TOKEN
            },
        });
        dispatch(getFeedbackSuccess(res.data));
    } catch (error) {
        dispatch(getFeedbackFailure());
    }
};

export const deleteFeedback = async (id, dispatch) => {
    dispatch(deleteFeedbackStart());
    try {
        await axios.delete("/feedback/" + id, {
            headers: {
                token: "Bearer " + TOKEN
            },
        })
        dispatch(deleteFeedbackSuccess(id));
    } catch (error) {
        dispatch(deleteFeedbackFailure());
    }
};
