import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import Cookies from "universal-cookie/cjs";
import store from './store';
import {Provider} from "react-redux";

const cookies = new Cookies();
const cookie_token = cookies.get('sra_token');

if(cookie_token) {
    setAuthToken(cookie_token);
    const decoded = jwt_decode(cookie_token);
    store.dispatch(setCurrentUser(decoded));

    const message_content = "Session expired. Please login again.";
    const current_time = Date.now() / 1000;
    if (decoded.exp < current_time) {
        store.dispatch(logoutUser(message_content));
        window.location.href = '/login';
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
