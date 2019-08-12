import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import renderHTML from 'react-render-html';
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {decode} from "../../utils/SetBase64";
import connect from "react-redux/es/connect/connect";
import {
    getDefaultPreviewCampaignData,
    getMessageSend,
    getNewCampaignData,
    getPreviewCampaignData
} from "../../actions/campaignActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmpty from "../../validations/isEmpty";
import currentDate from "../../utils/currentDate";
import queryString from "query-string";
import Button from "@material-ui/core/Button";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fade from "@material-ui/core/Fade";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    rssContent: {
        flexGrow: 1,
        padding: theme.spacing(2),
        textAlign: "center",
    },
    content: {
        marginTop: "10%",
        flexGrow: 1,
        padding: theme.spacing(2),
        textAlign: "center",
    },
    button: {
        marginTop: theme.spacing(.5),
        marginLeft: theme.spacing(.15),
        marginRight: theme.spacing(.15),
        marginBottom: theme.spacing(2),
        boxShadow: 'none !important',
        textTransform: 'none',
    },
    downButton: {
        minWidth: '30px !important',
        paddingLeft: 0,
        paddingRight: 0,
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    paper: {
        marginTop: theme.spacing(.45),
        minWidth: 180,
    },
    previewNote: {
        color: '#000000',
        display: 'inline-block',
        backgroundColor: '#FBEECA',
        padding: theme.spacing(1.2, 1.6),
        marginTop: theme.spacing(1.5),
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            shorten: '',
            status: '',
            id: 0,
            encodedId: 0,
            anchorEl: null,
            rowsPerPage: 5,
            isOpenSendDialog: false,
        }
    }

    onClickRefetch = () => {
        const {shorten, id} = this.state;

        this.props.getNewCampaignData(shorten, id);

        this.setState({anchorEl: null});
    };

    handlePopperClick = e => {
        const {anchorEl} = this.state;

        this.setState({anchorEl: anchorEl ? null : e.currentTarget});
    };

    openSendDialog = () => {
        this.setState({isOpenSendDialog: true});
    };

    closeSendDialog = () => {
        this.setState({isOpenSendDialog: false});
    };

    handleSendCampaign = () => {
        const {shorten, id, rowsPerPage} = this.state;
        const url = this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf("/"));

        this.props.getMessageSend(shorten, id, rowsPerPage);
        this.setState({isOpenSendDialog: false});
        this.props.history.push(`${url}?tab=active&page=1`);
    };

    refreshComponent = () => {
        this.componentDidMount();
    };

    componentDidMount() {
        let id, encodedId;
        const {action} = queryString.parse(this.props.location.search);
        const rawEncoded = decode(this.props.match.params.account);

        if(action !== 'defaultPreview') {
            id = decode(this.props.match.params.id);
            encodedId = this.props.match.params.id;
        }

        const arr = rawEncoded.split('-');
        const shorten = decode(arr[0]);
        const account = decode(arr[1]);
        const status = decode(arr[4]);

        if(action === 'preview')
            this.props.getPreviewCampaignData(shorten, id);
        else if(action === 'defaultPreview')
            this.props.getDefaultPreviewCampaignData(shorten);
        else
            this.props.getPreviewCampaignData(shorten, id);

        this.setState({account, shorten, status, id, encodedId});
    }

    createMarkup() {
        const {rss, index} = this.props.campaigns.data;
        let template = this.props.campaigns.data.template.map(template => template.template.replace(/\\/g, ''));
        let template1, template2, template3, indexes = '';
        let categories = [];

        this.props.campaigns.data.feedTemplate.filter(feed_template => {if(feed_template.name === 'rss_template2') {template1 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.campaigns.data.feedTemplate.filter(feed_template => {if(feed_template.name === 'rss_template') {template2 = feed_template.data.replace(/\\"/g, '"');} return null;});
        this.props.campaigns.data.feedTemplate.filter(feed_template => {if(feed_template.name === 'rss_template3') {template3 = feed_template.data.replace(/\\"/g, '"');} return null;});

        rss.filter(data => {
            if(!isEmpty(categories) && !categories.some(e => e.category === data.category))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });
            else if (isEmpty(categories))
                categories.push({
                    category: data.category,
                    list_value: '',
                    details_value: '',
                });

            return null;
        });

        if(!isEmpty(categories)) {
            categories.map(category => {
                rss.map(data => {
                    if(category.category === data.category) {
                        category.list_value += template1.replace("[TITLE]", data.title).replace("[URL]", data.url);
                        category.details_value += template2.replace("[TITLE]", data.title).replace(/\[URL]/g, data.url).replace("[CONTENT]", data.content).replace("[IMAGE]", data.image).replace("[TAG]", data.tag).replace("[CAPTION]", data.caption).replace("[AUTHOR]", data.author).replace("[AUTHOR]", data.author).replace("[AUTHOR]", data.author).replace("[AUTHOR]", data.author).replace("[AUTHOR]", data.author);
                    }

                    return null;
                });

                return null;
            });
        }

        if(!isEmpty(index)) {
            index.map(index => {
                if(!isEmpty(index.image)) {
                    indexes += template3.replace("[IMAGE]", index.image);
                }
                return null;
            })
        }

        try {
            if(!isEmpty(categories)) {
                template = template[0];

                categories.map(category => {
                    const list = "<li>["+category.category+"-]</li>";
                    const details = "["+category.category+"]";
                    template = template.replace(list, category.list_value);
                    template = template.replace(details, category.details_value);

                    return null;
                });

                if(!isEmpty(indexes))
                    template = template.replace("[INDEX]", indexes);
            }

            template = template.replace("[DATETODAY]", currentDate());

        } catch (e) {
            console.log();
        }

        return {__html: template};
    }

    render() {
        const {account, encodedId, anchorEl, isOpenSendDialog} = this.state;
        const {classes, loading} = this.props;
        const anchorId = anchorEl ? 'simple-popper' : null;
        const {action, tab} = queryString.parse(this.props.location.search);
        const defaultPreview = 'defaultPreview';

        const sendDialog = (<Dialog
            open={isOpenSendDialog}
            onClose={this.closeSendDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'xs'}
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to send {account}#{encodedId}?
            </DialogTitle>
            <DialogActions>
                <Button color="secondary" onClick={this.closeSendDialog}>
                    Cancel
                </Button>
                <Button color="primary" onClick={this.handleSendCampaign} autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>);

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>{account} | SalesRobot3.0</title>
                </Helmet>
                {sendDialog}
                <Grid container spacing={3}>
                    <Grid item xs={action === defaultPreview ? 4 : 6}>
                        <Typography variant={'h6'}>
                            Campaign Details
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            {action === defaultPreview ? `Campaign Account: ${account}` : `Campaign ID: ${account}#${encodedId}`}
                        </Typography>
                    </Grid>
                    {action === defaultPreview && <Grid item xs={4} style={{textAlign: 'center'}}>
                        <Box className={classes.previewNote} borderRadius={25} fontWeight={600} fontSize={16}>
                            Preview Mode
                        </Box>
                    </Grid>}
                    <Grid item xs={action === defaultPreview ? 4 : 6} style={{textAlign: 'right'}}>
                        {!loading.buffer && <Typography>
                            <Button color="primary" className={classes.button} variant="contained" onClick={this.refreshComponent}>
                                Refresh
                            </Button>
                            <Button color="primary" className={[classes.button, classes.downButton]} aria-describedby={anchorId} variant="contained" onClick={this.handlePopperClick}>
                                <KeyboardArrowDown/>
                            </Button>
                            <Popper id={anchorId} open={anchorEl} anchorEl={anchorEl} transition placement="bottom-end">
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={150}>
                                        <Paper className={classes.paper}>
                                            <List component="nav" className={classes.list}>
                                                <ListItem className={classes.listItem} button>
                                                    <ListItemText primary="Edit"/>
                                                </ListItem>
                                                {action !== defaultPreview && tab === 'draft' && <ListItem className={classes.listItem} button onClick={this.onClickRefetch}>
                                                    <ListItemText primary="Fetch New Data" />
                                                </ListItem>}
                                                {action !== defaultPreview && tab === 'draft' && <ListItem className={classes.listItem} button>
                                                    <ListItemText primary="Send" onClick={this.openSendDialog}/>
                                                </ListItem>}
                                            </List>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        </Typography>}
                    </Grid>
                    {!loading.buffer && (<Grid
                        className={classes.rssContent}
                        container
                        spacing={0}
                        justify="center"
                        alignItems="center"
                    >
                        {renderHTML('<style type="text/css">ul, ol {padding-left: 40px;} strong {font-weight: 600 !important;}</style>')}
                        <div dangerouslySetInnerHTML={this.createMarkup()}/>
                    </Grid>)}
                </Grid>
                {loading.buffer && <Grid
                    className={classes.content}
                    container
                    spacing={0}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item alignItems="center">
                        <Typography variant={'body1'}>
                            <CircularProgress/>
                        </Typography>
                        <Typography variant={'body1'}>
                            {loading.message}
                        </Typography>
                    </Grid>
                </Grid>}
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    getPreviewCampaignData: PropTypes.func.isRequired,
    getNewCampaignData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    campaigns: state.campaigns,
});

export default connect(mapStateToProps, {getDefaultPreviewCampaignData, getPreviewCampaignData, getNewCampaignData, getMessageSend})(withStyles(styles)(Dashboard));
