import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import {Helmet} from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

class Dashboard extends Component {
    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Helmet defer={false}>
                    <title>Dashboard | SalesRobot3.0</title>
                </Helmet>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            Dashboard
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            Welcome to SalesRobot Dashboard
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem commodi consectetur consequatur consequuntur cumque dolore earum error esse est exercitationem explicabo fuga in incidunt inventore laborum laudantium, magnam maiores minima mollitia necessitatibus nemo nostrum officiis porro praesentium provident quas quasi quidem rem rerum sed sint suscipit ut, vel veritatis vero! Amet, aspernatur corporis debitis dolor enim error est explicabo fugiat impedit in inventore laboriosam nam perferendis quae saepe sapiente similique! Dolores fuga laudantium nobis quasi ratione sunt tempore veritatis vero. Ad adipisci aperiam assumenda aut blanditiis delectus deleniti deserunt dolore dolorum ea enim eos est excepturi exercitationem fugit id iste magnam, maxime minima molestiae natus necessitatibus nisi nobis nulla obcaecati odit officia porro provident, quam quia quidem quod rem reprehenderit tempora ullam veniam voluptatum. Dolorem in perspiciatis ratione! A aliquam commodi consectetur cumque, cupiditate dicta dolores, eius eum, fugit incidunt labore laborum nemo neque nihil nostrum officia officiis optio perferendis perspiciatis provident quia quibusdam quis quisquam quos rem saepe sed similique temporibus tenetur totam ut vel veritatis voluptatum! Consectetur magnam omnis ut. Aliquid consequuntur cupiditate deserunt excepturi expedita facere ipsum mollitia non numquam tempora. Eum facilis hic itaque mollitia necessitatibus odio, quia repellat sequi voluptatem. Aperiam dicta, nam.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem commodi consectetur consequatur consequuntur cumque dolore earum error esse est exercitationem explicabo fuga in incidunt inventore laborum laudantium, magnam maiores minima mollitia necessitatibus nemo nostrum officiis porro praesentium provident quas quasi quidem rem rerum sed sint suscipit ut, vel veritatis vero! Amet, aspernatur corporis debitis dolor enim error est explicabo fugiat impedit in inventore laboriosam nam perferendis quae saepe sapiente similique! Dolores fuga laudantium nobis quasi ratione sunt tempore veritatis vero. Ad adipisci aperiam assumenda aut blanditiis delectus deleniti deserunt dolore dolorum ea enim eos est excepturi exercitationem fugit id iste magnam, maxime minima molestiae natus necessitatibus nisi nobis nulla obcaecati odit officia porro provident, quam quia quidem quod rem reprehenderit tempora ullam veniam voluptatum. Dolorem in perspiciatis ratione! A aliquam commodi consectetur cumque, cupiditate dicta dolores, eius eum, fugit incidunt labore laborum nemo neque nihil nostrum officia officiis optio perferendis perspiciatis provident quia quibusdam quis quisquam quos rem saepe sed similique temporibus tenetur totam ut vel veritatis voluptatum! Consectetur magnam omnis ut. Aliquid consequuntur cupiditate deserunt excepturi expedita facere ipsum mollitia non numquam tempora. Eum facilis hic itaque mollitia necessitatibus odio, quia repellat sequi voluptatem. Aperiam dicta, nam.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
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

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
