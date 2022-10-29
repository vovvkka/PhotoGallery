import {createSlice} from "@reduxjs/toolkit";

const name = 'photos';

export const initialState = {
    photos: [],
    fetchLoading: false,
    fetchError: null,
    addPhotoLoading: false,
    addPhotoError: null,
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
        clearPhotoErrors(state) {
            state.addPhotoError = null;
        }
    }
});

export default photosSlice;
