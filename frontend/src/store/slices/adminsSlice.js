import {createSlice} from "@reduxjs/toolkit";

const name = 'admins';

export const initialState = {
    photos: [],
    fetchLoading: false,
    fetchError: null,
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
        publishPhotoRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        publishPhotoSuccess(state, {payload: id}) {
            state.fetchLoading = false;
            state.photos = state.photos.filter(photo => photo._id !== id)
        },
        publishPhotoFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
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
    }
});

export default photosSlice;
