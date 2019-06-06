import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validations/isEmpty'
import setAuthToken from "../utils/setAuthToken";
import {
    SET_CURRENT_USER,
    SET_MESSAGE,
    CLEAR_USERS
} from './types';

import {setLoadingFalse, setLoadingTrue} from "./loadingActions";
import {clearErrors, setErrors} from "./errorActions";


export const loginUser = (userData, errors) => dispatch => {
    dispatch(setLoadingTrue());

    if(Object.keys(errors).length > 0) {
        dispatch(clearErrors());
    }
    axios.post('http://www.analyticsapi.salesrobot.com/api/auth/login/', userData)
        .then(res => {

            const {token} = res.data;

            const cookies = new Cookies();
            cookies.set('sra_token', token, { path: '/' });

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setErrors(err.response.data))
        })
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = (message, users) => dispatch => {
    const cookie = new Cookies();
    cookie.remove('sra_token', { path: '/' });
    setAuthToken(false);
    if(!isEmpty(message)) {
        dispatch(setMessage(message))
    }
    try {
        if(!users === undefined || !users.length < 1)
            dispatch(clearUsers())
    } catch(e) {
        if(!users === undefined)
            dispatch(clearUsers())
    }

    dispatch(setCurrentUser({}));
};

// export const setLoadingTrue = () => {
//     return {
//         type: SET_LOADING_TRUE
//     }
// };
//
// export const setLoadingFalse = () => {
//     return {
//         type: SET_LOADING_FALSE
//     }
// };
//
// export const setError = err => {
//     return {
//         type: GET_ERRORS,
//         payload: err.response.data
//     }
// };

export const setMessage = message => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
};

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
};
