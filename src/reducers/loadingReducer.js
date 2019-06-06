import {SET_LOADING_FALSE, SET_LOADING_TRUE} from "../actions/types";

const initialState = {
    buffer: false,
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                buffer: true
            };
        case SET_LOADING_FALSE:
            return {
                buffer: false
            };
        default:
            return state;
    }
}
