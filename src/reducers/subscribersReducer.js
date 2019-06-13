import {
    CLEAR_SUBSCRIBER_MEMBERS,
    CLEAR_SUBSCRIBERS_LISTS,
    GET_SUBSCRIBER_MEMBERS,
    GET_SUBSCRIBERS_LISTS
} from "../actions/types";

const initialState = {
    subscribersList: [],
    subscriberMembers: {},
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_SUBSCRIBERS_LISTS:
            return {
                ...state,
                subscribersList: action.payload,
            };
        case GET_SUBSCRIBER_MEMBERS:
            return {
                ...state,
                subscriberMembers: action.payload,
            };
        case CLEAR_SUBSCRIBERS_LISTS:
            return {
                ...state,
                subscribersList: [],
            };
        case CLEAR_SUBSCRIBER_MEMBERS:
            return {
                ...state,
                subscriberMembers: {},
            };
        default:
            return state;
    }
}
