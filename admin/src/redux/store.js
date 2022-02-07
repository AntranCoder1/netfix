import { configureStore, combineReducers } from '@reduxjs/toolkit';
import MovieRedux from './MovieRedux';
import UserRedux from './UserRedux';
import ListRedux from './ListRedux';
import LoginRedux from './loginAdmin/LoginRedux';
import FeedbackRedux from './FeedbackRedux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ 
    admin: LoginRedux, 
    user: UserRedux, 
    movie: MovieRedux, 
    list: ListRedux,
    feedback: FeedbackRedux
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export let persistor = persistStore(store);