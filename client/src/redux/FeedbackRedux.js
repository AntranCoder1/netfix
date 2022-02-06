import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        feedbacks: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        addFeedbackStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addFeedbackSuccess: (state, action) => {
            state.isFetching = false;
            state.feedbacks.push(action.payload);
        },
        addFeedbackFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    addFeedbackStart,
    addFeedbackSuccess,
    addFeedbackFailure
} = feedbackSlice.actions;

export default feedbackSlice.reducer;