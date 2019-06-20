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
    tableRow: {
        cursor: 'pointer',
    },
    tableCell: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
    },
});

let id = 0;
function createData(account, shorten, teamLead, sched, time, status) {
    id += 1;
    return {id, account, shorten, teamLead, sched, time, status};
}

const data = [
    createData('Perspecta', 'perspecta', 'Ray Santos', 'Monday - Friday','7:00AM EST', 'Active'),
    createData('CACI', 'caci', 'Gigi Melecio', 'Monday - Friday','7:00AM EST', 'Active'),
    createData('Premier', 'premier', 'Marc Mondala', 'Monday - Friday','7:00AM EST', 'Active'),
    createData('SAP Public Services', 'sap', 'Anna Mondala', 'Monday - Friday','7:00AM EST', 'Internal Testing'),
];

const AccountTablesFor7 = props => {
    const {classes, searchText} = props;

    const content1 = (data.map(n => {
        return (
            <TableRow className={classes.tableRow} key={n.id} onClick={() => props.onClick(n.shorten, n.account, n.sched, n.time, n.status)} hover>
                <TableCell component="th" scope="row">
                    <Typography color="primary">{n.account}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.sched}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.time}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.status}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography className={classes.subtitles} variant="subtitle2">{n.teamLead}</Typography>
                </TableCell>
            </TableRow>
        );
    }));
    const content2 = (data.filter(n => {
        return n.account.toLowerCase().includes(searchText);
    }).map(n => {
        return (
            <TableRow className={classes.tableRow} key={n.id} onClick={() => props.onClick(n.shorten, n.account, n.sched, n.time, n.status)} hover>
                <TableCell component="th" scope="row">
                    <Typography color="primary">{n.account}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.sched}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.time}</Typography>
                    <Typography className={classes.subtitles} variant="subtitle2">{n.status}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography className={classes.subtitles} variant="subtitle2">{n.teamLead}</Typography>
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
            <Table>
                <TableBody>
                    {isEmpty(searchText) ? content1 : !isEmpty(content2) ? content2 : noResult}
                </TableBody>
            </Table>
        </Paper>
    );
};

AccountTablesFor7.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTablesFor7);