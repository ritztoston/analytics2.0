import {CLEAR_SUBSCRIBERS_LISTS, GET_SUBSCRIBERS_LISTS} from "../actions/types";

const initialState = {
    subscribersList: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_SUBSCRIBERS_LISTS:
            return {
                ...state,
                subscribersList: action.payload,
            };
        case CLEAR_SUBSCRIBERS_LISTS:
            return {
                ...state,
                subscribersList: {},
            };
        default:
            return state;
    }
}
