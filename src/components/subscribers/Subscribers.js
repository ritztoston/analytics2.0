import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {fade} from "@material-ui/core/styles";
import SubscribersArchintelTables from "../tables/SubscribersArchintelTables";
import SubscribersTradTables from "../tables/SubscribersTradTables";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import {addSubscribers, getSubscribersList} from "../../actions/subscriberActions";
import connect from "react-redux/es/connect/connect";
import isEmpty from "../../validations/isEmpty";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AddIcon from '@material-ui/icons/Add';
import {withSnackbar} from "notistack";
import {encode} from "../../utils/SetBase64";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
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
    titles: {
        margin: theme.spacing(2, 2, 2, 1),
    },
    listItem: {
        display: "inline-block",
        textAlign: "center",
    },
});

class Subscribers extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            account: '',
            openDialog: false,
            subId: 0,
            subName: '',
            subscribersText: '',
            shorten: '',
            submitted: false,
            subscribersTextArray: '',
        };
    }

    quickAdd = (account, shorten) => e =>{
        e.stopPropagation();

        this.props.getSubscribersList(shorten);
        this.setState({account, openDialog: true, shorten, submitted: false});
    };

    onCloseDialog = () => {
        this.setState({openDialog: false, subId: 0, subName: '', subscribersText: '', account: '', shorten: '', submitted: false, subscribersTextArray: ''})
    };

    onChangeSearchText = e => {
        this.setState({searchText: e.target.value});
    };

    clearSearchText = () => {
        this.setState({searchText: ''});
    };

    onClickSubscriberList = (subId, subName) => {
        this.setState({subId, subName});
    };

    onChangeSubscribersText = e => {
        this.setState({subscribersText: e.target.value});
    };

    async addSubscribers(shorten, emails, subId) {
        await this.props.addSubscribers(shorten, emails, subId);
        this.setState({submitted: true, subscribersTextArray: emails});
    };

    onClick = (shorten, account) => {
        const encodedShorten = encode(shorten);
        const encodedAccount = encode(account);
        const encodedAll = `${encodedShorten}-${encodedAccount}`;
        const encoded = encode(encodedAll);

        this.props.history.push(`${this.props.location.pathname}/${encoded}`);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {submitted, subscribersTextArray, subName} = prevState;
        const successMessage = `Successfully added subscriber/s to ${subName}.`;
        const errorMessage = `Email address/es already exist in ${subName}.`;

        if(submitted) {
            if (!isEmpty(nextProps.errors)) {
                if (nextProps.errors.toString() === subscribersTextArray.toString())
                    nextProps.enqueueSnackbar(errorMessage, {variant: 'error'});
                else {
                    nextProps.enqueueSnackbar(successMessage, {variant: 'success'});
                    nextProps.enqueueSnackbar(errorMessage, {variant: 'error'});
                }
            } else {
                nextProps.enqueueSnackbar(successMessage, {variant: 'success'});
                return {submitted: false, openDialog: false, subId: 0, subName: '', subscribersText: '', account: '', shorten: '', subscribersTextArray: ''};
            }

            return {submitted: false};
        }

        return null;
    }

    render() {
        const {classes, subscribers, loading, errors} = this.props;
        const {searchText, account, openDialog, subName, subscribersText, shorten, subId} = this.state;
        const subsTextArray = subscribersText.split(/\n/).filter(n => !isEmpty(n));

        const listLoading = (<React.Fragment>
            <ListItem className={classes.listItem}>
                <CircularProgress/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="Loading list..."/>
            </ListItem>
        </React.Fragment>);
        const addingLoading = (<React.Fragment>
            <ListItem className={classes.listItem}>
                <CircularProgress/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="Adding subscriber/s..."/>
            </ListItem>
        </React.Fragment>);

        const dialog = (<Dialog open={openDialog} onClose={this.onCloseDialog} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">{isEmpty(errors) ? (!isEmpty(subName) ? `Import email address to ${subName}` : `Select ${account}'s list`) : `Failed to import to ${subName}`}</DialogTitle>
            {!isEmpty(subName) ? (<React.Fragment>
                <DialogContent>
                    {isEmpty(errors) ? <DialogContentText>
                        To subscribe to this list, please enter the email addresses to import, one per line, in the text field below.
                    </DialogContentText> : <DialogContentText>
                        The following email address/es already exist in the list or had an invalid email syntax:
                    </DialogContentText>}
                    {isEmpty(errors) ? (!loading.buffer ? <TextField
                        id="outlined-multiline-flexible"
                        label="Email Addresses"
                        multiline
                        value={subscribersText}
                        rowsMax="15"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.onChangeSubscribersText}
                    /> : addingLoading) : errors.map(n => <ListItem>
                        {n}
                    </ListItem>)}
                </DialogContent>
                <DialogActions>
                    {isEmpty(errors) ? (<React.Fragment>
                        <Button color="primary" onClick={this.onCloseDialog}>
                            Cancel
                        </Button>
                        <Button color="primary" disabled={loading.buffer || isEmpty(subsTextArray)} onClick={() => this.addSubscribers(shorten, subsTextArray, subId)}>
                            Subscribe
                        </Button>
                    </React.Fragment>) : <Button color="primary" onClick={this.onCloseDialog}>
                        Close
                    </Button>}
                </DialogActions>
            </React.Fragment>) : (<List alignItems="center">
                {!isEmpty(subscribers.subscribersList) && !loading.buffer ? (
                    subscribers.subscribersList.map(n => {
                        return (
                            <ListItem button onClick={() => this.onClickSubscriberList(n.id, n.name)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AddIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={n.name}/>
                            </ListItem>
                        )
                    })
                ) : listLoading}
            </List>)}
        </Dialog>);

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>Subscribers | SalesRobot3.0</title>
                </Helmet>
                {dialog}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant={'h6'}>
                            Subscribers
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            Add or delete new subscribers
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: 'right'}}>
                        <Paper style={{display: 'inline-block'}}>
                            <div className={classes.search}>
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
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Traditional List
                        </Typography>
                        <SubscribersTradTables onClick={this.onClick} quickAdd={this.quickAdd} searchText={searchText}/>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            ArchIntel Account List
                        </Typography>
                        <SubscribersArchintelTables onClick={this.onClick} quickAdd={this.quickAdd} searchText={searchText}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Lorem ipsum dolor sit amet
                        </Typography>
                        <Paper className={classes.paper}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem commodi consectetur consequatur consequuntur cumque dolore earum error esse est exercitationem explicabo fuga in incidunt inventore laborum laudantium, magnam maiores minima mollitia necessitatibus nemo nostrum officiis porro praesentium provident quas quasi quidem rem rerum sed sint suscipit ut, vel veritatis vero! Amet, aspernatur corporis debitis dolor enim error est explicabo fugiat impedit in inventore laboriosam nam perferendis quae saepe sapiente similique! Dolores fuga laudantium nobis quasi ratione sunt tempore veritatis vero. Ad adipisci aperiam assumenda aut blanditiis delectus deleniti deserunt dolore dolorum ea enim eos est excepturi exercitationem fugit id iste magnam, maxime minima molestiae natus necessitatibus nisi nobis nulla obcaecati odit officia porro provident, quam quia quidem quod rem reprehenderit tempora ullam veniam voluptatum. Dolorem in perspiciatis ratione! A aliquam commodi consectetur cumque, cupiditate dicta dolores, eius eum, fugit incidunt labore laborum nemo neque nihil nostrum officia officiis optio perferendis perspiciatis provident quia quibusdam quis quisquam quos rem saepe sed similique temporibus tenetur totam ut vel veritatis voluptatum! Consectetur magnam omnis ut. Aliquid consequuntur cupiditate deserunt excepturi expedita facere ipsum mollitia non numquam tempora. Eum facilis hic itaque mollitia necessitatibus odio, quia repellat sequi voluptatem. Aperiam dicta, nam.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Lorem ipsum dolor sit amet
                        </Typography>
                        <Paper className={classes.paper}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem commodi consectetur consequatur consequuntur cumque dolore earum error esse est exercitationem explicabo fuga in incidunt inventore laborum laudantium, magnam maiores minima mollitia necessitatibus nemo nostrum officiis porro praesentium provident quas quasi quidem rem rerum sed sint suscipit ut, vel veritatis vero! Amet, aspernatur corporis debitis dolor enim error est explicabo fugiat impedit in inventore laboriosam nam perferendis quae saepe sapiente similique! Dolores fuga laudantium nobis quasi ratione sunt tempore veritatis vero. Ad adipisci aperiam assumenda aut blanditiis delectus deleniti deserunt dolore dolorum ea enim eos est excepturi exercitationem fugit id iste magnam, maxime minima molestiae natus necessitatibus nisi nobis nulla obcaecati odit officia porro provident, quam quia quidem quod rem reprehenderit tempora ullam veniam voluptatum. Dolorem in perspiciatis ratione! A aliquam commodi consectetur cumque, cupiditate dicta dolores, eius eum, fugit incidunt labore laborum nemo neque nihil nostrum officia officiis optio perferendis perspiciatis provident quia quibusdam quis quisquam quos rem saepe sed similique temporibus tenetur totam ut vel veritatis voluptatum! Consectetur magnam omnis ut. Aliquid consequuntur cupiditate deserunt excepturi expedita facere ipsum mollitia non numquam tempora. Eum facilis hic itaque mollitia necessitatibus odio, quia repellat sequi voluptatem. Aperiam dicta, nam.
                            </Typography>
                        </Paper>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Lorem ipsum dolor sit amet
                        </Typography>
                        <Paper className={classes.paper}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem commodi consectetur consequatur consequuntur cumque dolore earum error esse est exercitationem explicabo fuga in incidunt inventore laborum laudantium, magnam maiores minima mollitia necessitatibus nemo nostrum officiis porro praesentium provident quas quasi quidem rem rerum sed sint suscipit ut, vel veritatis vero! Amet, aspernatur corporis debitis dolor enim error est explicabo fugiat impedit in inventore laboriosam nam perferendis quae saepe sapiente similique! Dolores fuga laudantium nobis quasi ratione sunt tempore veritatis vero. Ad adipisci aperiam assumenda aut blanditiis delectus deleniti deserunt dolore dolorum ea enim eos est excepturi exercitationem fugit id iste magnam, maxime minima molestiae natus necessitatibus nisi nobis nulla obcaecati odit officia porro provident, quam quia quidem quod rem reprehenderit tempora ullam veniam voluptatum. Dolorem in perspiciatis ratione! A aliquam commodi consectetur cumque, cupiditate dicta dolores, eius eum, fugit incidunt labore laborum nemo neque nihil nostrum officia officiis optio perferendis perspiciatis provident quia quibusdam quis quisquam quos rem saepe sed similique temporibus tenetur totam ut vel veritatis voluptatum! Consectetur magnam omnis ut. Aliquid consequuntur cupiditate deserunt excepturi expedita facere ipsum mollitia non numquam tempora. Eum facilis hic itaque mollitia necessitatibus odio, quia repellat sequi voluptatem. Aperiam dicta, nam.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Subscribers.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getSubscribersList: PropTypes.func.isRequired,
    addSubscribers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    subscribers: state.subscribers,
    errors: state.errors,
});

export default connect(mapStateToProps, {getSubscribersList, addSubscribers})(withStyles(styles)(withSnackbar(Subscribers)));
