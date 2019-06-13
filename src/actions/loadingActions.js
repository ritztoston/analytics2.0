import {SET_LOADING_FALSE, SET_LOADING_TRUE, SET_LOADING_TRUE_W_MESSAGE} from "./types";

export const setLoadingTrue = () => {
    return {
        type: SET_LOADING_TRUE
    }
};

export const setLoadingTrueWMessage = payload => {
    return {
        type: SET_LOADING_TRUE_W_MESSAGE,
        payload
    }
};

export const setLoadingFalse = () => {
    return {
        type: SET_LOADING_FALSE
    }
};
