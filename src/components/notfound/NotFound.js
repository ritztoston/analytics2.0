import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {NoSim} from '@material-ui/icons';
import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

const styles = theme => ({
    content: {
        marginTop: '10%',
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    logo: {
        fontSize: 45,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        marginTop: 5,
        ...theme.mixins.toolbar,
    },
    link: {
        color: '#48AFFF',
        textDecoration: 'none',
    },
});

class NotFound extends Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>Page Not Found | SalesRobot3.0</title>
                </Helmet>
                <Grid
                    className={classes.content}
                    container
                    spacing={0}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant={'h2'}>
                            Error 4<NoSim className={classes.logo}/>4
                        </Typography>
                        <Typography variant={'h4'}>
                            Page not found.
                        </Typography>
                        <div className={classes.toolbar}/>
                        <Typography variant={'body1'}>
                            The page you requested could not be found.
                            Please go back to the <Link className={classes.link} to="/dashboard">homepage</Link> or contact the admin.
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
