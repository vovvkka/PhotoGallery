import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

export const getPhotos = () => {
    return async dispatch => {
        try {
            dispatch(fetchPhotosRequest());

            const response = await axiosApi.get('/photos');

            dispatch(fetchPhotosSuccess(response.data));
        } catch (e) {
            dispatch(fetchPhotosFailure(e));
        }
    };
};

export const getUserPhotos = id => {
    return async dispatch => {
        try {
            dispatch(fetchUserPhotosRequest());

            const response = await axiosApi.get('/photos/gallery/' + id);

            dispatch(fetchUserPhotosSuccess(response.data));
        } catch (e) {
            dispatch(fetchUserPhotosFailure(e));
        }
    };
};

export const newPhoto = photoData => {
    return async dispatch => {
        try {
            dispatch(createPhotoRequest());

            await axiosApi.post('/photos', photoData);
            dispatch(createPhotoSuccess());

            dispatch(historyPush('/'));
            dispatch(addNotification('Your photo has been sent for moderation.', 'info'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createPhotoFailure(e.response.data));
            } else {
                dispatch(createPhotoRequest({global: 'No internet'}));
            }
        }
    };
};

export const {
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure,
    fetchUserPhotosRequest,
    fetchUserPhotosSuccess,
    fetchUserPhotosFailure,
    createPhotoRequest,
    createPhotoSuccess,
    createPhotoFailure,
    clearPhotoErrors
} = photosSlice.actions;