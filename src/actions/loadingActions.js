import {SET_LOADING_FALSE, SET_LOADING_TRUE} from "./types";

export const setLoadingTrue = () => {
    return {
        type: SET_LOADING_TRUE
    }
};

export const setLoadingFalse = () => {
    return {
        type: SET_LOADING_FALSE
    }
};
