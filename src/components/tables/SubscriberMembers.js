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
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import Moment from "react-moment";

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
    tableCell: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
    },
    typography: {
        textAlign: "center",
    },
    tablePagination: {
        borderBottom: 0,
        padding: 0
    },
    tableRowPagination: {
        padding: 0,
    },
});


const AccountTablesForTrad = props => {
    const {classes, data, rowsPerPage, page} = props;

    const noResult = (<TableRow>
        <TableCell className={classes.tableCell} component="th" scope="row" align="center">
            <Typography>- No result -</Typography>
        </TableCell>
    </TableRow>);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {!isEmpty(data.results) && data.results.map(n => {
                        return (
                            <TableRow className={classes.tableRow} key={n.id} hover>
                                <TableCell component="th" scope="row">
                                    <Typography>{n.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    {n.confirmed === 1 ? (<Typography className={classes.typography}>Confirmed</Typography>) : (<Typography className={classes.typography} color="textSecondary">------</Typography>)}
                                </TableCell>
                                <TableCell>
                                    {n.blacklisted === 1 ? (<Typography className={classes.typography}>Blacklisted</Typography>) : (<Typography className={classes.typography} color="textSecondary">------</Typography>)}
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2"><Moment date={n.entered} format="ddd, MMM D YYYY h:mm A"/></Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                {!isEmpty(data.results) ? <TableFooter>
                    <TableRow className={classes.tableRowPagination}>
                        <TablePagination
                            className={classes.tablePagination}
                            rowsPerPageOptions={[5, 10, 15]}
                            colSpan={4}
                            count={data.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{native: true,}}
                            onChangePage={props.handleChangePage}
                            onChangeRowsPerPage={props.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter> : null}
            </Table>
        </Paper>
    );
};

AccountTablesForTrad.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTablesForTrad);