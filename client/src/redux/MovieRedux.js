import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies = action.payload;
        },
        getMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },

        // LIKE
        likeMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        likeMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.map((movies) => {
                return {
                    ...movies,
                    likers: [action.payload.userId, ...movies.likers],
                }
            })
        },
        likeMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DISLIKE
        disLikeMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        disLikeMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.map(function(item) {
                return {
                    ...item,
                    likers: item.likers.filter((id) => id !== action.payload.userId)
                }
            })
        },
        disLikeMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // COMMENT
        addCommentStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addCommentSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.comments.push(action.payload);
        },
        addCommentFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // UPDATE COMMENT
        editCommentStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        editCommentSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.map((movies) => {
                return {
                    ...movies,
                    comments: movies.comments.map((comment) => {
                        if (comment._id === action.payload.commentId) {
                            return {
                                ...comment,
                                text: action.payload.text,
                            };
                        } else {
                            return comment;
                        }
                    }),
                };
            })
        },
        editCommentFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const { 
    getMovieStart, 
    getMovieSuccess, 
    getMovieFailure,
    likeMovieStart,
    likeMovieSuccess,
    likeMovieFailure,
    disLikeMovieStart,
    disLikeMovieSuccess,
    disLikeMovieFailure,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    editCommentStart,
    editCommentSuccess,
    editCommentFailure,
} = movieSlice.actions;

export default movieSlice.reducer;