import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmpty from "../../validations/isEmpty";
import Moment from 'react-moment';
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TimeAgo from "react-timeago/lib/index";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import {encode} from "./../../utils/SetBase64";

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
    tableCell: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
    },
    tablePagination: {
        borderBottom: 0,
        padding: 0
    },
    tableRowPagination: {
        padding: 0,
    },
    button: {
        marginTop: theme.spacing(.5),
        marginLeft: theme.spacing(.15),
        marginRight: theme.spacing(.15),
        marginBottom: theme.spacing(2),
        boxShadow: 'none !important',
        textTransform: 'none',
    },
    downButton: {
        minWidth: '30px !important',
        paddingLeft: 0,
        paddingRight: 0,
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    paper: {
        marginTop: theme.spacing(.45),
        boxShadow: 'none !important',
        minWidth: 180,
        backgroundColor: "#e0e0e0",
        color: "#000000",
    },
    listItem: {
        '&:hover': {
            backgroundColor: "#cfcfcf",
        }
    },
    link: {
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline",
        },
    },
});

const activeText = '- No active campaigns -';
const draftText = '- No drafts -';

const CampaignDataTables = props => {
    const {classes, loading, page, rowsPerPage, valueTab, anchorEl} = props;
    const {results, count} = valueTab === 0 ? props.data.active : valueTab === 1 ? props.data.draft : null;
    const id = anchorEl ? 'simple-popper' : null;

    const content = (<Table className={classes.table}>
        <TableBody>
            {!isEmpty(results) ? results.map(n => {
                const encodedId = encode(n.id);
                return (
                    <TableRow key={n.id}>
                        <TableCell className={classes.tableCell} component="th" scope="row">
                            <Typography className={classes.link} color="primary" component={Link} to={`${props.pathname}/${encodedId}?action=preview`}>{n.subject}</Typography>
                            <Typography className={classes.subtitles} variant="subtitle2">Sends on <Moment date={n.embargo} format="ddd, MMM D YYYY"/> at <Moment add={{hours: 4}} date={n.embargo} format="h:mm A" /></Typography>
                        </TableCell>
                        <TableCell align="right">
                            {valueTab === 0 ? (<Typography className={classes.subtitles} variant="subtitle2">
                                <Button className={classes.button} variant="contained" onClick={() => props.openPauseModal(n.subject, n.id)}>
                                    Pause
                                </Button>
                                <Button className={[classes.button, classes.downButton]} aria-describedby={id} variant="contained" onClick={props.handlePopperClick} on>
                                    <KeyboardArrowDown/>
                                </Button>
                                <Popper id={id} open={anchorEl} anchorEl={anchorEl} transition placement="bottom-end">
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={150}>
                                            <Paper className={classes.paper}>
                                                <List component="nav" className={classes.list}>
                                                    <ListItem className={classes.listItem} button>
                                                        <ListItemText primary="Edit" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem} button component={Link} to={`${props.pathname}/${encodedId}?action=preview`}>
                                                        <ListItemText primary="Preview" />
                                                    </ListItem>
                                                </List>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </Typography>) : valueTab === 1 ? (<Typography className={classes.subtitles} variant="subtitle2">
                                <Button className={classes.button} variant="contained">
                                    Start
                                </Button>
                                <Button className={[classes.button, classes.downButton]} aria-describedby={id} variant="contained" onClick={props.handlePopperClick}>
                                    <KeyboardArrowDown/>
                                </Button>
                                <Popper id={id} open={anchorEl} anchorEl={anchorEl} transition placement="bottom-end">
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={150}>
                                            <Paper className={classes.paper}>
                                                <List component="nav" className={classes.list}>
                                                    <ListItem className={classes.listItem} button>
                                                        <ListItemText primary="Force Start" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem} button>
                                                        <ListItemText primary="Edit" />
                                                    </ListItem>
                                                    <ListItem className={classes.listItem} button component={Link} to={`${props.pathname}/${encodedId}?action=preview`}>
                                                        <ListItemText primary="Preview" />
                                                    </ListItem>
                                                </List>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </Typography>) : null}
                            <Typography className={classes.subtitles} variant="subtitle2">
                                <Chip
                                    color="primary"
                                    label={valueTab === 0 ? <TimeAgo date={moment(n.embargo).add(4, 'hours')}/> : valueTab === 1 ? "Draft" : null}
                                    className={classes.chip}
                                    variant="outlined"
                                />
                            </Typography>
                        </TableCell>
                    </TableRow>
                );
            }) : <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tableCell} component="th" scope="row" align="center">
                            <Typography>{valueTab === 0 ? activeText : valueTab === 1 ? draftText : null}</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>}
        </TableBody>
        {!isEmpty(results) ? <TableFooter>
            <TableRow className={classes.tableRowPagination}>
                <TablePagination
                    className={classes.tablePagination}
                    rowsPerPageOptions={[5, 10, 15]}
                    colSpan={2}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{native: true,}}
                    onChangePage={props.handleChangePage}
                    onChangeRowsPerPage={props.handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter> : null}
    </Table>);

    const progress = (<Table className={classes.table}>
        <TableBody>
            <TableRow>
                <TableCell className={classes.tableCell} component="th" scope="row" align="center">
                    <CircularProgress className={classes.progress} />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>);

    return loading ? progress : content;
};

CampaignDataTables.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignDataTables);