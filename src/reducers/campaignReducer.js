import {CLEAR_CAMPAIGNS, SET_ACTIVE_CAMPAIGNS, SET_DRAFT_CAMPAIGNS} from "../actions/types";

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
        case CLEAR_CAMPAIGNS:
            return {
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
            };
        default:
            return state;
    }
}
