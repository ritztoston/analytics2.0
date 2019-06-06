import {setLoadingFalse, setLoadingTrue} from "./loadingActions";
import axios from 'axios';
import {setErrors} from "./errorActions";
import {CLEAR_CAMPAIGNS, SET_ACTIVE_CAMPAIGNS, SET_DRAFT_CAMPAIGNS} from "./types";

export const getActiveCampaign = (account, rowsPerPage) => dispatch => {
    dispatch(clearCampaigns());
    dispatch(setLoadingTrue());

    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/active/?page_size=${rowsPerPage}`)
        .then(res => {
            dispatch(setActiveCampaign(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setErrors(err));
            dispatch(setLoadingFalse());
        })
};

export const setActiveCampaign = res => {
    return {
        type: SET_ACTIVE_CAMPAIGNS,
        payload: res.data
    }
};


export const getDraftCampaign = (account, rowsPerPage) => dispatch => {
    dispatch(clearCampaigns());
    dispatch(setLoadingTrue());

    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/draft/?page_size=${rowsPerPage}`)
        .then(res => {
            dispatch(setDraftCampaign(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setErrors(err));
            dispatch(setLoadingFalse());
        })
};

export const setDraftCampaign = res => {
    return {
        type: SET_DRAFT_CAMPAIGNS,
        payload: res.data
    }
};

export const clearCampaigns = () => {
    return {
        type: CLEAR_CAMPAIGNS
    }
};

export const getMessagePaused = (account, id, rowsPerPage) => async dispatch => {
    dispatch(setLoadingTrue());
    try {
        await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/update/sent/${id}`);
        const res = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/draft/?page_size=${rowsPerPage}`);
        dispatch(setDraftCampaign(res));
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};