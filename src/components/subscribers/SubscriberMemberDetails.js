import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {decode} from "../../utils/SetBase64";
import SubscriberMembers from "../tables/SubscriberMembers";
import connect from "react-redux/es/connect/connect";
import {getAllSubscriberMembers, getBlacklistSubscriber, getSubscriberMembers} from "../../actions/subscriberActions";
import queryString from "query-string";
import clsx from "clsx";
import {fade} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";
import isEmpty from "../../validations/isEmpty";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({
    search: {
        position: 'relative',
        display: 'inline-block',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    closeButton: {
        opacity: '.5 !important',
        margin: theme.spacing(1.5),
    },
    closeFade: {
        margin: theme.spacing(1.5),
        opacity: 0,
    },
    button: {
        marginRight: theme.spacing(1),
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            id: 0,
            selectedIDs: [],
            selectedEmails: [],
            shorten: '',
            name: '',
            rowsPerPage: 15,
            page: 0,
            searchText: '',
            selected: null,
            stringIds: '',
            isOpenBlackListDialog: false,
        };
    }

    componentDidMount() {
        const {page} = queryString.parse(this.props.location.search);
        const {rowsPerPage} = this.state;
        const rawEncoded = decode(this.props.match.params.id);

        const arr = rawEncoded.split('-');
        const id = decode(arr[0]);
        const name = decode(arr[1]);
        const account = decode(arr[2]);
        const shorten = decode(arr[3]);

        this.props.getSubscriberMembers(id, shorten, rowsPerPage, page);
        this.props.getAllSubscriberMembers(id, shorten);

        this.setState({id, name, account, shorten, page: page >= 1 ? page-1 : 0});
    }

    handleChangePage = (e, page) => {
        const {id, shorten, rowsPerPage} = this.state;
        this.setState({page});
        this.props.getSubscriberMembers(id, shorten, rowsPerPage, page+1);
        this.props.history.push(`${this.props.location.pathname}?page=${page+1}`);
    };

    handleChangeRowsPerPage = e => {
        const {id, shorten, page} = this.state;

        this.props.getSubscriberMembers(id, shorten, e.target.value, page+1);
        this.setState({rowsPerPage: e.target.value})
    };

    onChangeSearchText = e => {
        this.setState({searchText: e.target.value});
    };

    clearSearchText = () => {
        this.setState({searchText: ''});
    };

    handleCheckBox = (id, email) => {
        const {selectedIDs, selectedEmails} = this.state;
        let idsArray = [], index, emailArray = [], indexEmail, stringIds;

        if(!isEmpty(selectedIDs))
            idsArray = selectedIDs;

        if(!isEmpty(selectedEmails))
            emailArray = selectedEmails;

        index = idsArray.indexOf(id);
        indexEmail = emailArray.indexOf(email);

        if(index !== -1) {
            idsArray.splice(index, 1)
        } else idsArray.push(id);

        if(indexEmail !== -1) {
            emailArray.splice(indexEmail, 1)
        } else emailArray.push(email);

        stringIds = JSON.stringify(idsArray).replace('[', '').replace(']', '');
        this.setState({selectedIDs: idsArray, selectedEmails: emailArray, stringIds});
    };

    isSelected = id => {
        const {selected} = this.state;

        if(!isEmpty(selected)) return selected.indexOf(id) !== -1;
        return null;
    };

    handleClickBlacklist = () => {
        this.setState({isOpenBlackListDialog: true});
    };

    closeBlacklistDialog = () => {
        this.setState({isOpenBlackListDialog: false});
    };

    onConfirmBlacklist = () => {
        const {page} = queryString.parse(this.props.location.search);
        const {id, stringIds, shorten, rowsPerPage} = this.state;

        this.props.getBlacklistSubscriber(id, page, rowsPerPage, stringIds, shorten);
        this.props.getAllSubscriberMembers(id, shorten);
        this.setState({selectedIDs: [], isOpenBlackListDialog: false});
    };

    render() {
        const {account, name, rowsPerPage, page, searchText, selectedIDs, isOpenBlackListDialog, selectedEmails} = this.state;
        const {classes, subscribers, loading} = this.props;

        const cofirmBlacklist = (
            <Dialog
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={isOpenBlackListDialog}
                onClose={this.closeBlacklistDialog}
            >
                <DialogTitle id="confirmation-dialog-title">Confirm to blacklist subscribers?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Blacklist the following email address/es:
                    </DialogContentText>
                    {!isEmpty(selectedEmails) && selectedEmails.map(n => <ListItem>
                        {n}
                    </ListItem>)}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.closeBlacklistDialog}>
                        Cancel
                    </Button>
                    <Button color="secondary" onClick={this.onConfirmBlacklist}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>{name} | {account} | SalesRobot3.0</title>
                </Helmet>
                {cofirmBlacklist}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant={'h6'}>
                            {account} ({name})
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            List of subscribed emails
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: 'right'}}>
                        {!isEmpty(selectedIDs) && <Button variant="contained" onClick={this.handleClickBlacklist} color="secondary" className={classes.button}>
                            Blacklist
                        </Button>}
                        {/*<Button variant="contained" onClick={this.handleClickBlacklist} color="primary" className={classes.button}>*/}
                            {/*Subscribe*/}
                        {/*</Button>*/}
                        <Paper style={{display: 'inline-block'}}>
                            {!loading.buffer2 && !isEmpty(subscribers.subscriberAllMembers) ? <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    onChange={this.onChangeSearchText}
                                    value={searchText}
                                />
                                <IconButton className={clsx(classes.closeFade, {
                                    [classes.closeButton]: searchText,
                                })} size="small" onClick={this.clearSearchText}>
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            </div> : null}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <SubscriberMembers handleCheckBox={this.handleCheckBox} isSelected={this.isSelected} data={subscribers.subscriberMembers} rowsPerPage={rowsPerPage} page={page} handleChangeRowsPerPage={this.handleChangeRowsPerPage} handleChangePage={this.handleChangePage} searchText={searchText} allData={subscribers.subscriberAllMembers}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    getSubscriberMembers: PropTypes.func.isRequired,
    getAllSubscriberMembers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    subscribers: state.subscribers,
    errors: state.errors,
});

export default connect(mapStateToProps, {getSubscriberMembers, getAllSubscriberMembers, getBlacklistSubscriber})(withStyles(styles)(Dashboard));
