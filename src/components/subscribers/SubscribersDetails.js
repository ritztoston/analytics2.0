import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {decode, encode} from "../../utils/SetBase64";
import connect from "react-redux/es/connect/connect";
import {getSubscribersList} from "../../actions/subscriberActions";
import isEmpty from "../../validations/isEmpty";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const styles = ({
    icon: {
        marginRight: 5,
        fontSize: 35,
    },
    subDetails: {
        paddingLeft: 15,
        paddingRight: 15,
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            shorten: '',
        };
    }

    onClickCard = (id, name, account, shorten) => {
        const encodedId = encode(id);
        const encodedName = encode(name);
        const encodedAccount = encode(account);
        const encodedShorten = encode(shorten);

        const encodedAll = `${encodedId}-${encodedName}-${encodedAccount}-${encodedShorten}`;
        const encoded = encode(encodedAll);

        this.props.history.push(`${this.props.location.pathname}/${encoded}?page=1`);
    };

    componentDidMount() {
        const rawEncoded = decode(this.props.match.params.account);

        const arr = rawEncoded.split('-');
        const shorten = decode(arr[0]);
        const account = decode(arr[1]);

        this.props.getSubscribersList(shorten);
        this.setState({shorten, account});
    }

    render() {
        const {shorten, account} = this.state;
        const {classes, subscribers} = this.props;

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>{account} | Subscribers | SalesRobot3.0</title>
                </Helmet>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            {account} list
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            Add or delete new list
                        </Typography>
                    </Grid>
                    {!isEmpty(subscribers.subscribersList) && subscribers.subscribersList.map(n => (
                        <Grid item xs={6} sm={3} md={2} lg={2} key={n.id}>
                            <Card>
                                <CardActionArea onClick={() => this.onClickCard(n.id, n.name, account, shorten)}>
                                    <CardContent>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid xs={12} item style={{marginBottom: 25}}>
                                                <Grid container direction="row" alignItems="center" justify="center">
                                                    <Grid item>
                                                        <Typography variant="h6">
                                                            {n.name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-start">
                                                    <Grid item>
                                                        <Typography className={classes.subDetails}>
                                                            Subscribers:
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-end">
                                                    <Grid item>
                                                        <Typography color="primary" className={classes.subDetails}>
                                                            {n.subscribers.toLocaleString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-start">
                                                    <Grid item>
                                                        <Typography className={classes.subDetails}>
                                                            Confirmed:
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-end">
                                                    <Grid item>
                                                        <Typography color="primary" className={classes.subDetails}>
                                                            {n.confirmed.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-start">
                                                    <Grid item>
                                                        <Typography className={classes.subDetails}>
                                                            Unconfirmed:
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-end">
                                                    <Grid item>
                                                        <Typography color="primary" className={classes.subDetails}>
                                                            {n.unconfirmed.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-start">
                                                    <Grid item>
                                                        <Typography className={classes.subDetails}>
                                                            Blacklisted:
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-end">
                                                    <Grid item>
                                                        <Typography color="primary" className={classes.subDetails}>
                                                            {n.blacklisted.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    subscribers: state.subscribers,
    errors: state.errors,
});

export default connect(mapStateToProps, {getSubscribersList})(withStyles(styles)(Dashboard));
