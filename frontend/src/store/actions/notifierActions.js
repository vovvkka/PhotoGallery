import {toast} from "react-toastify";

export const addNotification = (message, type, options) => {
    const defaultOptions = {
        position: "bottom-left",
        autoClose: 1500,
        closeOnClick: true,
        theme: 'dark'
    };

    return () => {
        switch (type) {
            case 'info':
                toast.info(message, {...defaultOptions, ...options});
                break;
            case 'success':
                toast.success(message, {...defaultOptions, ...options});
                break;
            case 'warn':
                toast.warn(message, {...defaultOptions, ...options});
                break;
            case 'error':
                toast.error(message, {...defaultOptions, ...options});
                break;
            default:
                console.error('Incorrect type');
        }
    }
};