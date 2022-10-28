import usersSlice from "../slices/usersSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));

            dispatch(historyPush('/'));
            dispatch(addNotification('Register successful!', 'success'));
        } catch (e) {
            dispatch(addNotification('Register failed!', 'error'));

            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));

            dispatch(historyPush('/'));
            dispatch(addNotification('Login successful!', 'success'));
        } catch (e) {
            dispatch(addNotification('Login failed!', 'error'));

            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            dispatch(facebookLoginRequest());

            const response = await axiosApi.post('/users/facebookLogin', data);
            dispatch(facebookLoginSuccess(response.data.user));

            dispatch(historyPush('/'));
            dispatch(addNotification('Login successful!', 'success'));
        } catch (e) {
            dispatch(addNotification('Login failed!', 'error'));

            if (e.response && e.response.data) {
                dispatch(facebookLoginFailure(e.response.data));
            } else {
                dispatch(facebookLoginFailure({global: 'No internet'}));
            }
        }
    };
};

export const userLogout = () => {
    return async (dispatch) => {
        try {
            await axiosApi.delete('/users/sessions');
            dispatch(logoutUser());

            dispatch(historyPush('/'));
            dispatch(addNotification('Logout successful!', 'info'));
        } catch (e) {
            console.error(e);
        }
    }
}

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    facebookLoginRequest,
    facebookLoginSuccess,
    facebookLoginFailure,
    logoutUser,
    clearRegisterErrors,
    clearLoginErrors
} = usersSlice.actions;
