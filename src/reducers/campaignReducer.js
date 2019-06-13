import {
    CLEAR_CAMPAIGNS, GET_INDEX_DATA, GET_RSS_DATA,
    GET_RSS_FEED_TEMPLATE,
    GET_TEMPLATE,
    SET_ACTIVE_CAMPAIGNS,
    SET_DRAFT_CAMPAIGNS
} from "../actions/types";

const initialState = {
    active: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    draft: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    data: {
        template: [],
        feedTemplate: [],
        rss: [],
        index: [],
    },
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_ACTIVE_CAMPAIGNS:
            return {
                ...state,
                active: action.payload,
            };
        case SET_DRAFT_CAMPAIGNS:
            return {
                ...state,
                draft: action.payload,
            };
        case GET_TEMPLATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    template: [...action.payload]
                }
            };
        case GET_RSS_FEED_TEMPLATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    feedTemplate: [...action.payload]
                }
            };
        case GET_INDEX_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    index: [...action.payload]
                }
            };
        case GET_RSS_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    rss: [...action.payload]
                }
            };
        case CLEAR_CAMPAIGNS:
            return state;
        default:
            return state;
    }
}
