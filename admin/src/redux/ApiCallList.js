import {
    getListStart,
    getListSuccess,
    getListFailure,
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