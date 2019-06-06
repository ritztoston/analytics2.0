import axios from 'axios';
import {setLoadingFalse, setLoadingTrue} from "./loadingActions";
import {setErrors} from "./errorActions";
import {CLEAR_SUBSCRIBERS_LISTS, GET_SUBSCRIBERS_LISTS} from "./types";

export const getSubscribersList = shorten => dispatch => {
    dispatch(setLoadingTrue());
    dispatch(clearSubscribersList());

    axios.get(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers-lists/`)
        .then(res => {
            dispatch(setSubscribersList(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setErrors(err));
            dispatch(setLoadingFalse());
        })
};

export const setSubscribersList = res => {
    return {
        type: GET_SUBSCRIBERS_LISTS,
        payload: res.data
    }
};

export const clearSubscribersList = () => {
    return {
        type: CLEAR_SUBSCRIBERS_LISTS
    }
};