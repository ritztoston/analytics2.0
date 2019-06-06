import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import isEmpty from "../../validations/isEmpty";
import Button from "@material-ui/core/Button";
import PersonAdd from '@material-ui/icons/PersonAdd';
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    root: {
        display: 'flex',
        overflowX: 'hide',
    },
    table: {
        minWidth: 340,
    },
    subtitles: {
        color: theme.palette.text.secondary,
    },
    icons: {
        marginRight: 5,
        fontSize: 16,
    },
    tableRow: {
        cursor: 'pointer',
    },
    addIcon: {
        margin: 2,
    },
    tableCell: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
    },
});

let id = 0;
function createData(account, shorten, status) {
    id += 1;
    return {id, account, shorten, status};
}

const data = [
    createData('GovConWire', 'govconwire', 'Internal Testing'),
    createData('ExecutiveBiz', 'executivebiz', 'Active'),
    createData('GovConDaily', 'govcondaily', 'Active'),
];

const SubscribersArchintelTables = props => {
    const {classes, searchText} = props;

    const content1 = (data.map(n => {
        return (
            <TableRow className={classes.tableRow} key={n.id} hover>
                <TableCell component="th" scope="row">
                    <Typography color="primary">{n.account}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.sched}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.status}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">123 subscribers</Typography>
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
    const content2 = (data.filter(n => {
        return n.account.toLowerCase().includes(searchText);
    }).map(n => {
        return (
            <TableRow className={classes.tableRow} key={n.id} hover>
                <TableCell component="th" scope="row">
                    <Typography color="primary">{n.account}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.sched}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.status}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">123 subscribers</Typography>
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
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {isEmpty(searchText) ? content1 : !isEmpty(content2) ? content2 : noResult}
                </TableBody>
            </Table>
        </Paper>
    );
};

SubscribersArchintelTables.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubscribersArchintelTables);