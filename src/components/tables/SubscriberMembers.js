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
import Checkbox from "@material-ui/core/Checkbox";

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
    const {classes, data, rowsPerPage, page, searchText, allData} = props;

    const filteredData = (
        allData.filter(n => {
            return !isEmpty(n.email) && n.email.toLowerCase().includes(searchText);
        }).map((n, index) => {
            const isItemSelected = props.isSelected(n.id);
            const labelId = `table-checkbox-${index}`;

            return (
                <TableRow className={classes.tableRow} key={n.id} hover>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={() => props.handleCheckBox(n.id, n.email)}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography>{n.email}</Typography>
                    </TableCell>
                    <TableCell>
                        {n.blacklisted === 1 ? (<Typography color="secondary" className={classes.typography}>Blacklisted</Typography>) : n.confirmed === 1 ? (<Typography color="textSecondary" className={classes.typography}>Confirmed</Typography>) : (<Typography color="secondary" className={classes.typography}>Unconfirmed</Typography>)}
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="subtitle2"><Moment subtract={{hours: 4}} date={n.entered} format="ddd, MMM D YYYY h:mm A"/></Typography>
                    </TableCell>
                </TableRow>
            );
        })
    );

    const noResult = (
        <TableRow>
            <TableCell component="th" scope="row" align="center">
                <Typography>- Subscriber not found -</Typography>
            </TableCell>
        </TableRow>
    );

    return (
        <Paper className={classes.root}>
            <Table>
                <TableBody>
                    {isEmpty(searchText) ? !isEmpty(data.results) && data.results.map((n, index) => {
                        const isItemSelected = props.isSelected(n.id);
                        const labelId = `table-checkbox-${index}`;

                        return (
                            <TableRow role="checkbox" tabIndex={-1} selected={isItemSelected} aria-checked={isItemSelected} className={classes.tableRow} key={n.id} hover>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        onClick={() => props.handleCheckBox(n.id, n.email)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{n.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    {n.blacklisted === 1 ? (<Typography color="secondary" className={classes.typography}>Blacklisted</Typography>) : n.confirmed === 1 ? (<Typography color="textSecondary" className={classes.typography}>Confirmed</Typography>) : (<Typography color="secondary" className={classes.typography}>Unconfirmed</Typography>)}
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2"><Moment subtract={{hours: 4}} date={n.entered} format="ddd, MMM D YYYY h:mm A"/></Typography>
                                </TableCell>
                            </TableRow>
                        );
                    }) : !isEmpty(allData) && !isEmpty(filteredData) ? filteredData : noResult}
                </TableBody>
                {!isEmpty(data.results) && isEmpty(searchText) ? <TableFooter>
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