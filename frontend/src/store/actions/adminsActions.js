import axiosApi from "../../axiosApi";
import {addNotification} from "./notifierActions";
import adminsSlice from "../slices/adminsSlice";

export const getPhotosAdmin = () => {
    return async dispatch => {
        try {
            dispatch(fetchPhotosRequest());

            const response = await axiosApi.get('/admins');

            dispatch(fetchPhotosSuccess(response.data));
        } catch (e) {
            dispatch(fetchPhotosFailure(e));
        }
    };
};

export const publishTrack = id => {
    return async dispatch => {
        try {
            dispatch(publishPhotoRequest());

            await axiosApi.post(`/admins/${id}/publish`);

            dispatch(publishPhotoSuccess(id));
            dispatch(addNotification('Published successfully!', 'success'));
        } catch (e) {
            dispatch(publishPhotoFailure(e));
        }
    };
};

export const deletePhotoAdmin = id => {
    return async dispatch => {
        try {
            dispatch(deletePhotoRequest());

            await axiosApi.delete('/admins/' + id);
            dispatch(deletePhotoSuccess(id));

            dispatch(addNotification('Delete successful!', 'success'));
        } catch (e) {
            dispatch(deletePhotoFailure(e));
        }
    };
};

export const {
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure,
    publishPhotoRequest,
    publishPhotoSuccess,
    publishPhotoFailure,
    deletePhotoRequest,
    deletePhotoSuccess,
    deletePhotoFailure,
} = adminsSlice.actions;