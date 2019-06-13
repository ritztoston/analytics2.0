import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {decode} from "../../utils/SetBase64";
import SubscriberMembers from "../tables/SubscriberMembers";
import connect from "react-redux/es/connect/connect";
import {addSubscribers, getSubscriberMembers, getSubscribersList} from "../../actions/subscriberActions";
import queryString from "query-string";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            id: 0,
            shorten: '',
            name: '',
            rowsPerPage: 15,
            page: 0,
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

    render() {
        const {account, name, rowsPerPage, page} = this.state;
        const {classes, subscribers} = this.props;

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>{name} | {account} | SalesRobot3.0</title>
                </Helmet>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            {name}
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            List of subscribed emails
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SubscriberMembers data={subscribers.subscriberMembers} rowsPerPage={rowsPerPage} page={page} handleChangeRowsPerPage={this.handleChangeRowsPerPage} handleChangePage={this.handleChangePage}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    getSubscriberMembers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    subscribers: state.subscribers,
    errors: state.errors,
});

export default connect(mapStateToProps, {getSubscriberMembers})(withStyles(styles)(Dashboard));
