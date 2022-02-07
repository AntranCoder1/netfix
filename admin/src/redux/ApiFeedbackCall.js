import { 
    getFeedbackStart, 
    getFeedbackSuccess, 
    getFeedbackFailure 
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
