import {SET_CURRENT_USER, SET_MESSAGE, SET_UNLOAD_MESSAGE} from '../actions/types';
import isEmpty from '../validations/isEmpty';

const initialState = {
    isAuthenticated: false,
    message: '',
    user: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case SET_UNLOAD_MESSAGE:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
}
