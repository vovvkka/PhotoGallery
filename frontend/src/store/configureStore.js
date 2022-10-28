import {combineReducers} from "redux";
import axiosApi from "../axiosApi";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState
})

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

export default store;