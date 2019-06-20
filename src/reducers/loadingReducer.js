import {
    SET_LOADING_FALSE,
    SET_LOADING_TRUE,
    SET_LOADING_TRUE_W_MESSAGE,
    SET_LOADING_TWO_FALSE,
    SET_LOADING_TWO_TRUE
} from "../actions/types";

const initialState = {
    buffer: false,
    buffer2: false,
    message: '',
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                ...state,
                buffer: true
            };
        case SET_LOADING_TWO_TRUE:
            return {
                ...state,
                buffer2: true
            };
        case SET_LOADING_TRUE_W_MESSAGE:
            return {
                ...state,
                buffer: true,
                message: action.payload,
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                buffer: false,
                message: '',
            };
        case SET_LOADING_TWO_FALSE:
            return {
                ...state,
                buffer2: false,
                message: '',
            };
        default:
            return state;
    }
}
