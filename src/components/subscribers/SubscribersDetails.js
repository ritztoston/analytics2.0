import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import PersonIcon from '@material-ui/icons/Person';
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

const styles = theme => ({
    icon: {
        marginRight: 5,
        fontSize: 35,
    },
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
        const {subscribers} = this.props;

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
                        <Grid item xs={12} sm={6} md={4} lg={3} key={n.id}>
                            <Card>
                                <CardActionArea onClick={() => this.onClickCard(n.id, n.name, account, shorten)}>
                                    <CardContent>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid xs={7} item>
                                                <Typography variant="h6">
                                                    {n.name}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={5} item>
                                                <Grid container direction="row" alignItems="center" justify="flex-end">
                                                    <Grid item>
                                                        <PersonIcon color="primary"/>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color="primary" guterBottom variant="h5" component="h2">
                                                            {n.subscribers.toLocaleString()}
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
