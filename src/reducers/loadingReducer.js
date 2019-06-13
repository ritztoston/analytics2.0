import {SET_LOADING_FALSE, SET_LOADING_TRUE, SET_LOADING_TRUE_W_MESSAGE} from "../actions/types";

const initialState = {
    buffer: false,
    message: '',
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                buffer: true
            };
        case SET_LOADING_TRUE_W_MESSAGE:
            return {
                buffer: true,
                message: action.payload,
            };
        case SET_LOADING_FALSE:
            return {
                buffer: false,
                message: '',
            };
        default:
            return state;
    }
}
