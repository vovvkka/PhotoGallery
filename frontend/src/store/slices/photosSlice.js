import {createSlice} from "@reduxjs/toolkit";

const name = 'photos';

export const initialState = {
    photos: [],
    addPhotoLoading: false,
    addPhotoError: null,
};

const photosSlice = createSlice({
    name,
    initialState,
    reducers: {
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
