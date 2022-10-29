import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";


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
    }
}

export const {
    createPhotoRequest,
    createPhotoSuccess,
    createPhotoFailure,
    clearPhotoErrors
} = photosSlice.actions;