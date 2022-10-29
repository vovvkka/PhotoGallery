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

export const getPrivatePhoto = query => {
    return async dispatch => {
        try {
            dispatch(fetchPrivatePhotoRequest());

            const response = await axiosApi.get('/photos/private' + query);

            dispatch(fetchPrivatePhotoSuccess(response.data));
        } catch (e) {
            dispatch(fetchPrivatePhotoFailure(e));
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

export const createPrivateToken = id => {
    return async dispatch => {
        try {
            dispatch(createTokenRequest());

            const response = await axiosApi.post('/photos/private/' + id);

            dispatch(createTokenSuccess(response.data));
        } catch (e) {
            dispatch(createTokenFailure(e));
        }
    };
};

export const deletePhoto = id => {
    return async dispatch => {
        try {
            dispatch(deletePhotoRequest());

            await axiosApi.delete('/photos/' + id);
            dispatch(deletePhotoSuccess(id));

            dispatch(addNotification('Delete successful!', 'success'));
        } catch (e) {
            dispatch(deletePhotoFailure(e));
        }
    };
};

export const {
    fetchPrivatePhotoRequest,
    fetchPrivatePhotoSuccess,
    fetchPrivatePhotoFailure,
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure,
    fetchUserPhotosRequest,
    fetchUserPhotosSuccess,
    fetchUserPhotosFailure,
    createPhotoRequest,
    createPhotoSuccess,
    createPhotoFailure,
    createTokenRequest,
    createTokenSuccess,
    createTokenFailure,
    deletePhotoRequest,
    deletePhotoSuccess,
    deletePhotoFailure,
    clearPhotoErrors
} = photosSlice.actions;