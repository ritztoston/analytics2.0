import axios from 'axios';
import {setLoadingFalse, setLoadingTrue} from "./loadingActions";
import {clearErrors, setErrors} from "./errorActions";
import {CLEAR_SUBSCRIBERS_LISTS, GET_SUBSCRIBERS_LISTS} from "./types";

export const getSubscribersList = shorten => dispatch => {
    dispatch(setLoadingTrue());
    dispatch(clearErrors());
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

export const addSubscribers = (shorten, emails, subId) => async dispatch => {
    await dispatch(setLoadingTrue());
    await dispatch(clearErrors());
    try {
        await axios.put(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers/add/${subId}/`, emails);
        await dispatch(setLoadingFalse());
    } catch (err) {
        await dispatch(setErrors(err.response.data));
        await dispatch(setLoadingFalse());
    }
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