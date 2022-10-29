import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    selectedGalleryUser: null,
    galleryLoading: false,
    galleryError: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

const usersSLice = createSlice({
    name,
    initialState,
    reducers: {
        fetchUserRequest(state) {
            state.galleryLoading = true;
            state.galleryError = null;
        },
        fetchUserSuccess(state, {payload: user}) {
            state.galleryLoading = false;
            state.selectedGalleryUser = user;
        },
        fetchUserFailure(state,{payload: error}) {
            state.galleryLoading = false;
            state.galleryError = error;
        },
        registerUserRequest(state) {
            state.registerLoading = true;
            state.registerError = null;
        },
        registerUserSuccess(state, {payload: user}) {
            state.registerLoading = false;
            state.user = user;
        },
        registerUserFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginUserRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginUserSuccess(state, {payload: user}) {
            state.loginLoading = false;
            state.user = user;
        },
        loginUserFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        facebookLoginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        facebookLoginSuccess(state, {payload: user}) {
            state.loginLoading = false;
            state.user = user;
        },
        facebookLoginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutUser(state) {
            state.user = null;
        },
        clearRegisterErrors(state) {
            state.registerError = null;
        },
        clearLoginErrors(state) {
            state.loginError = null;
        }
    }
});

export default usersSLice;
