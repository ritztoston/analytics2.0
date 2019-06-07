import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountTablesFor6 from "../tables/AccountTablesFor6";
import AccountTablesFor7 from "../tables/AccountTablesFor7";
import AccountTablesForTrad from "../tables/AccountTablesForTrad";
import {encode} from "../../utils/SetBase64";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";

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
    titles: {
        margin: theme.spacing(2, 2, 2, 1),
    },
});

class Campaigns extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
        };
    }

    onClick = (shorten, account, sched, time, status) => {
        const encodedShorten = encode(shorten);
        const encodedAccount = encode(account);
        const encodedSched = encode(sched);
        const encodedTime = encode(time);
        const encodedStatus = encode(status);
        const encodedAll = `${encodedShorten}-${encodedAccount}-${encodedSched}-${encodedTime}-${encodedStatus}`;
        const encoded = encode(encodedAll);

        this.props.history.push(`campaigns/${encoded}?tab=active&page=1`);
    };

    onChangeSearchText = e => {
        this.setState({searchText: e.target.value});
    };

    clearSearchText = () => {
        this.setState({searchText: ''});
    };

    render() {
        const {classes} = this.props;
        const {searchText} = this.state;

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>Campaigns | SalesRobot3.0</title>
                </Helmet>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant={'h6'}>
                            Campaigns
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            List of accounts
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
                    <Grid item xs={12} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Briefing for 6:00AM
                        </Typography>
                        <AccountTablesFor6 onClick={this.onClick} searchText={searchText}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Briefing for 7:00AM
                        </Typography>
                        <AccountTablesFor7 onClick={this.onClick} searchText={searchText}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Typography className={classes.titles} variant={'subtitle1'}>
                            Traditional List
                        </Typography>
                        <AccountTablesForTrad onClick={this.onClick} searchText={searchText}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Campaigns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Campaigns);
