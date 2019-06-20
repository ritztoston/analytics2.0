import axios from 'axios';
import {setLoadingFalse, setLoadingTrue, setLoadingTwoFalse, setLoadingTwoTrue} from "./loadingActions";
import {clearErrors, setErrors} from "./errorActions";
import {
    CLEAR_SUBSCRIBER_ALL_MEMBERS,
    CLEAR_SUBSCRIBER_MEMBERS,
    CLEAR_SUBSCRIBERS_LISTS, GET_SUBSCRIBER_ALL_MEMBERS,
    GET_SUBSCRIBER_MEMBERS,
    GET_SUBSCRIBERS_LISTS
} from "./types";
import {setDraftCampaign} from "./campaignActions";

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

export const getSubscriberMembers = (id, shorten, pageSize, page) => dispatch => {
    dispatch(setLoadingTrue());
    dispatch(clearErrors());
    dispatch(clearSubscriberMembers());

    axios.get(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers-members/${id}/?page=${page}&page_size=${pageSize}`)
        .then(res => {
            dispatch(setSubscriberMembers(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setErrors(err));
            dispatch(setLoadingFalse());
        })
};

export const getAllSubscriberMembers = (id, shorten) => dispatch => {
    dispatch(setLoadingTwoTrue());
    dispatch(clearErrors());
    dispatch(clearAllSubscriberMembers());

    axios.get(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers-all-members/${id}/`)
        .then(res => {
            dispatch(setAllSubscriberMembers(res));
            dispatch(setLoadingTwoFalse());
        })
        .catch(err => {
            dispatch(setErrors(err));
            dispatch(setLoadingTwoFalse());
        })
};

export const getBlacklistSubscriber = (id, page, pageSize, stringIds, shorten) => async dispatch => {
    dispatch(setLoadingTrue());
    try {
        await axios.put(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers/delete/${stringIds}/`);
        const res = await axios.get(`http://www.analyticsapi.salesrobot.com/${shorten}/subscribers-members/${id}/?page=${page}&page_size=${pageSize}`);
        dispatch(setSubscriberMembers(res));
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};

export const setSubscriberMembers = res => {
    return {
        type: GET_SUBSCRIBER_MEMBERS,
        payload: res.data
    }
};

export const setAllSubscriberMembers = res => {
    return {
        type: GET_SUBSCRIBER_ALL_MEMBERS,
        payload: res.data
    }
};

export const setSubscribersList = res => {
    return {
        type: GET_SUBSCRIBERS_LISTS,
        payload: res.data
    }
};

export const clearSubscriberMembers = () => {
    return {
        type: CLEAR_SUBSCRIBER_MEMBERS
    }
};

export const clearAllSubscriberMembers = () => {
    return {
        type: CLEAR_SUBSCRIBER_ALL_MEMBERS
    }
};

export const clearSubscribersList = () => {
    return {
        type: CLEAR_SUBSCRIBERS_LISTS
    }
};