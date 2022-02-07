import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        feedbacks: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getFeedbackStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getFeedbackSuccess: (state, action) => {
            state.isFetching = false;
            state.feedbacks = action.payload;
        },
        getFeedbackFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    getFeedbackStart,
    getFeedbackSuccess,
    getFeedbackFailure,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;