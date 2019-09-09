import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import isEmpty from "../../validations/isEmpty";
import data from "../../utils/archintelData";
import Button from "@material-ui/core/Button";
import PersonAdd from '@material-ui/icons/PersonAdd';
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    root: {
        display: 'flex',
        overflowX: 'hide',
    },
    subtitles: {
        color: theme.palette.text.secondary,
    },
    icons: {
        marginRight: 5,
        fontSize: 16,
    },
    addIcon: {
        margin: 2,
    },
    button: {
        fontWeight: 600,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
});

const SubscribersArchintelTables = props => {
    const {classes, searchText, theme} = props;
    const content1 = (data.map(n => {
        return (
            <Grid item xs={6} sm={4} md={4} lg={4} key={n.id}>
                <Card>
                    <CardActionArea onClick={() => props.onClick(n.shorten, n.account)}>
                        <CardContent>
                            <Grid spacing={1} container direction="row">
                                <Grid xs={12} item style={{marginBottom: 25}}>
                                    <Grid container direction="row" justify="center">
                                        <Grid item>
                                            <Typography variant="h6" noWrap>
                                                {n.account}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item>
                                    <Button className={classes.button} fullWidth variant="contained" style={theme.palette.defaultBackgroundColor} onClick={props.quickAdd(n.account, n.shorten)}>
                                        Quick Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }));
    const content2 = (data.filter(n => {
        return n.account.toLowerCase().includes(searchText);
    }).map(n => {
        return (
            <TableRow className={classes.tableRow} key={n.id} hover>
                <TableCell component="th" scope="row">
                    <Typography color="primary">{n.account}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.sched}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.status}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Quick Add" placement="top">
                        <Button variant="contained" color="primary" className={classes.button} onClick={props.quickAdd(n.account, n.shorten)}>
                            <PersonAdd className={classes.addIcon} />
                        </Button>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }));
    const noResult = (<TableRow>
        <TableCell className={classes.tableCell} component="th" scope="row" align="center">
            <Typography>- No result -</Typography>
        </TableCell>
    </TableRow>);

    return (
        <Grid container spacing={2}>
            {isEmpty(searchText) ? content1 : !isEmpty(content2) ? content2 : noResult}
        </Grid>
    );
};

SubscribersArchintelTables.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubscribersArchintelTables);