import {setLoadingFalse, setLoadingTrue, setLoadingTrueWMessage} from "./loadingActions";
import axios from 'axios';
import {setErrors} from "./errorActions";
import {
    CLEAR_CAMPAIGNS,
    GET_INDEX_DATA, GET_RSS_DATA,
    GET_RSS_FEED_TEMPLATE,
    GET_TEMPLATE,
    SET_ACTIVE_CAMPAIGNS,
    SET_DRAFT_CAMPAIGNS
} from "./types";
import Parser from "xml2js";
import isEmpty from "../validations/isEmpty";

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
        const res = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/active/?page_size=${rowsPerPage}`);
        dispatch(setActiveCampaign(res));
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};

export const getMessageSend = (account, id, rowsPerPage) => async dispatch => {
    dispatch(setLoadingTrue());
    try {
        await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/update/submitted/${id}`);
        const res = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/active/?page_size=${rowsPerPage}`);
        dispatch(setActiveCampaign(res));
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};

export const getPreviewCampaignData = (account, id) => async dispatch => {
    try {
        dispatch(clearCampaigns());

        dispatch(setLoadingTrueWMessage('Retrieving template. Loading...'));
        const template = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/${id}`);
        const feedTemplate = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/${id}`);
        dispatch(setLoadingTrueWMessage('Fetching feed. Please wait...'));
        const rssData = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/${id}`);
        if(!isEmpty(rssData.data)) dispatch(setLoadingTrueWMessage('Fetch complete. Loaded RSS'));
        else dispatch(setLoadingTrueWMessage('Fetch failed. No RSS found'));
        const index = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/index/${id}`);


        dispatch(renderTemplate(template));
        dispatch(renderFeedTemplate(feedTemplate));
        dispatch(renderIndex(index));
        dispatch(renderData(rssData));

        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};

export const getNewCampaignData = (account, id) => async dispatch => {
    try {
        dispatch(clearCampaigns());

        dispatch(setLoadingTrueWMessage('Fetching campaign, loading...'));
        const res1 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/views/${id}/`);
        const res2 = await axios.get(`https://cors-anywhere.herokuapp.com/${res1.data[0].data}`);
        dispatch(setLoadingTrueWMessage('Reading RSS feed, loading...'));

        let feeds = [];
        await Parser.parseString(res2.data, (err, result) => feeds = result.rss.channel[0].item);

        dispatch(setLoadingTrueWMessage('Please wait, loading...'));
        try {
            await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/feed/delete/${id}/`);
        } catch (err) {
            dispatch(setErrors(err));
        }
        dispatch(setLoadingTrueWMessage('Retrieving new contents, loading...'));
        await axios.put(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/feed/add/${id}/`, feeds);
        dispatch(setLoadingTrueWMessage('Retrieving template, loading...'));
        const template = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/${id}`);
        const feedTemplate = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/${id}`);
        const rssData = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/${id}`);
        if(!isEmpty(rssData.data)) dispatch(setLoadingTrueWMessage('Fetch complete. Loaded RSS'));
        else dispatch(setLoadingTrueWMessage('Fetch failed. No RSS found'));
        const index = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/index/${id}`);

        dispatch(renderTemplate(template));
        dispatch(renderFeedTemplate(feedTemplate));
        dispatch(renderIndex(index));
        dispatch(renderData(rssData));

        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoadingFalse());
    }
};

export const renderTemplate = res => {
    return {
        type: GET_TEMPLATE,
        payload: res.data
    }
};

export const renderFeedTemplate = res => {
    return {
        type: GET_RSS_FEED_TEMPLATE,
        payload: res.data
    }
};

export const renderIndex = res => {
    return {
        type: GET_INDEX_DATA,
        payload: res.data
    }
};

export const renderData = res => {
    return {
        type: GET_RSS_DATA,
        payload: res.data
    }
};