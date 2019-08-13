import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import queryString from 'query-string'
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {decode} from "../../utils/SetBase64";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {getActiveCampaign, getDraftCampaign, getMessagePaused} from "../../actions/campaignActions";
import connect from "react-redux/es/connect/connect";
import CampaignDataTables from "../tables/CampaignDataTables";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CampaignSoloDetails from "./CampaignSoloDetails";

const styles = theme => ({
    tabPaper: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    typography: {
        padding: theme.spacing(1),
    },
});

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#249aff',
        },
    },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        fontSize: theme.typography.pxToRem(15),
        '&:focus': {
            opacity: 1,
        },
    },
}))(props => <Tab disableRipple {...props} />);

class CampaignDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shorten: '',
            account: '',
            sched: '',
            time: '',
            status: '',
            campaignTitle: null,
            valueTab: 0,
            rowsPerPage: 5,
            page: 0,
            anchorEl: null,
            openModal: false,
            campaignId: 0,
        };
    }

    handleChangeTab = (e, val) => {
        const {shorten, rowsPerPage, page} = this.state;

        let tab = '';
        this.setState({valueTab: val});

        if(val === 0) {
            tab = 'active';
            this.props.getActiveCampaign(shorten, rowsPerPage);
        }
        else if(val === 1) {
            tab = 'draft';
            this.props.getDraftCampaign(shorten, rowsPerPage);
        }
        else tab = 'sent';

        this.props.history.push(`${this.props.location.pathname}?tab=${tab}&page=${page+1}`);
        this.setState({rowsPerPage: 5});
    };

    handleChangePage = (e, page) => {
        const {tab} = queryString.parse(this.props.location.search);

        this.setState({page});
        this.props.history.push(`${this.props.location.pathname}?tab=${tab}&page=${page+1}`);
    };

    openPauseModal = (campaignTitle, campaignId) => {
        const {anchorEl} = this.state;

        this.setState({anchorEl: !anchorEl && null, campaignTitle, openModal: true, campaignId})
    };

    closePauseModal = () => {
        this.setState({openModal: false, campaignId: 0});
    };

    handlePopperClick = e => {
        const {anchorEl} = this.state;

        this.setState({anchorEl: anchorEl ? null : e.currentTarget})
    };

    handleChangeRowsPerPage = e => {
        const {tab} = queryString.parse(this.props.location.search);
        const {shorten} = this.state;

        if(tab === 'active') this.props.getActiveCampaign(shorten, e.target.value);
        else if(tab === 'draft') this.props.getDraftCampaign(shorten, e.target.value);

        this.setState({rowsPerPage: e.target.value})
    };

    getMessagePaused = () => {
        const {rowsPerPage, campaignId, shorten} = this.state;

        this.props.getMessagePaused(shorten, campaignId, rowsPerPage);
        this.setState({openModal: false, campaignId: 0, valueTab: 0});

        // this.props.history.push(`${this.props.location.pathname}?tab=draft&page=1`);
        // this.props.history.push(`${this.props.location.pathname}?tab=active&page=1`);
    };

    componentDidMount() {
        const {tab, page} = queryString.parse(this.props.location.search);
        const rawEncoded = decode(this.props.match.params.account);
        const {rowsPerPage} = this.state;

        const arr = rawEncoded.split('-');
        const shorten = decode(arr[0]);
        const account = decode(arr[1]);
        const sched = decode(arr[2]);
        const time = decode(arr[3]);
        const status = decode(arr[4]);
        let valueTab = 0;

        if(tab === 'active') {
            valueTab = 0;
            this.props.getActiveCampaign(shorten, rowsPerPage);
        }
        else if(tab === 'draft') {
            valueTab = 1;
            this.props.getDraftCampaign(shorten, rowsPerPage);
        }
        else valueTab = 3;

        this.setState({shorten, account, sched, time, status, valueTab, page: page >= 1 ? page-1 : 0});
    }

    render() {
        const {classes, campaigns, loading, location} = this.props;
        const {account, sched, status, valueTab, page, rowsPerPage, anchorEl, campaignTitle, openModal} = this.state;
        const {action} = queryString.parse(this.props.location.search);

        const defaultContent = (<React.Fragment>
            <Helmet defer={false}>
                <title>{account} | SalesRobot3.0</title>
            </Helmet>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        {account}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                        {`Status: ${status}`}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                        {`Sends on ${sched} when new posts are added`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.tabPaper}>
                        <StyledTabs value={valueTab} onChange={this.handleChangeTab}>
                            <StyledTab label="Active" />
                            <StyledTab label="Draft" />
                        </StyledTabs>
                        <Typography className={classes.typography} />
                        <CampaignDataTables pathname={location.pathname} anchorEl={anchorEl} loading={loading.buffer} data={campaigns} page={page} rowsPerPage={rowsPerPage} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} valueTab={valueTab} handlePopperClick={this.handlePopperClick} openPauseModal={this.openPauseModal}/>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog
                open={openModal}
                onClose={this.closePauseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title">Are you sure to pause campaign?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Editing an active campaign, "{campaignTitle}", will place it back in the Draft queue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.closePauseModal}>
                        Disagree
                    </Button>
                    <Button color="primary" autoFocus onClick={this.getMessagePaused}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>);
        const previewContent = <CampaignSoloDetails {...this.props}/>;

        return action !== 'defaultPreview' ? defaultContent : previewContent
    }
}

CampaignDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    getActiveCampaign: PropTypes.func.isRequired,
    getMessagePaused: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    campaigns: state.campaigns,
});

export default connect(mapStateToProps, {getActiveCampaign, getDraftCampaign, getMessagePaused})(withStyles(styles)(CampaignDetails));
