import { addFeedbackStart, addFeedbackSuccess, addFeedbackFailure } from './FeedbackRedux';
import axios from 'axios';

const admin = JSON.parse(localStorage.getItem("persist:root"))?.admin;
const currentAdmin = admin && JSON.parse(admin).currentAdmin;
const TOKEN = currentAdmin?.token;

export const addFeedback = async (feedback, dispatch) => {
    dispatch(addFeedbackStart());
    try {
        const res = await axios.post("/feedback", feedback, {
            headers: {
                token: "Bearer" + TOKEN
            },
        });
        dispatch(addFeedbackSuccess(res.data));
    } catch (error) {
        dispatch(addFeedbackFailure());
    }
}