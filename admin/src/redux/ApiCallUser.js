import { 
    getUserStart,
    getUserSuccess,
    getUserFailure
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
}