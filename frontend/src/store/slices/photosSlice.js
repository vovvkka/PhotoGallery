import {createSlice} from "@reduxjs/toolkit";

const name = 'photos';

export const initialState = {
    photos: [],
    fetchLoading: false,
    fetchError: null,
    addPhotoLoading: false,
    addPhotoError: null,
    token: null,
};

const photosSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchPhotosRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchPhotosSuccess(state, {payload: photos}) {
            state.fetchLoading = false;
            state.photos = photos;
        },
        fetchPhotosFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        fetchUserPhotosRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchUserPhotosSuccess(state, {payload: photos}) {
            state.fetchLoading = false;
            state.photos = photos;
        },
        fetchUserPhotosFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        createPhotoRequest(state) {
            state.addPhotoLoading = true;
            state.addPhotoError = null;
        },
        createPhotoSuccess(state) {
            state.addPhotoLoading = false;
        },
        createPhotoFailure(state, {payload: error}) {
            state.addPhotoLoading = false;
            state.addPhotoError = error;
        },
        deletePhotoRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        deletePhotoSuccess(state, {payload: id}) {
            state.fetchLoading = false;
            state.photos = state.photos.filter(photo => photo._id !== id);
        },
        deletePhotoFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        createTokenRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        createTokenSuccess(state, {payload: token}) {
            state.fetchLoading = false;
            state.token = token;
        },
        createTokenFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        clearPhotoErrors(state) {
            state.addPhotoError = null;
        }
    }
});

export default photosSlice;
