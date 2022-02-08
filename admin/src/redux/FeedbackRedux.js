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
        },

        // DELETE FEEDBACK
        deleteFeedbackStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteFeedbackSuccess: (state, action) => {
            state.isFetching = false;
            state.feedbacks.splice(
                state.feedbacks.findIndex((item) => item._id === action.payload), 1
            );
        },
        deleteFeedbackFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    getFeedbackStart,
    getFeedbackSuccess,
    getFeedbackFailure,
    deleteFeedbackStart,
    deleteFeedbackSuccess,
    deleteFeedbackFailure
} = feedbackSlice.actions;

export default feedbackSlice.reducer;