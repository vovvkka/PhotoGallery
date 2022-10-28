import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import App from './App';
import './index.css';
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import history from "./history";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "./store/configureStore";

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
                <ToastContainer position="bottom-right" theme='colored'/>
            </Router>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);