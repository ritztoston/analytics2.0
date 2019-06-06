import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";
import campaignReducer from "./campaignReducer";
import subscribersReducer from "./subscribersReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    loading: loadingReducer,

    campaigns: campaignReducer,
    subscribers: subscribersReducer,
});