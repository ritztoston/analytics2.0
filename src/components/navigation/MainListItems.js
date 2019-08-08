import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import {navList} from "./navList";
import firstLetterCapital from "../../utils/firstLetterCapital";
import isUserAllowed from "../../utils/isUserAllowed";

const styles = () => ({
    root: {
        paddingLeft: 23,
    },
});

const MainListItems = ({onClick, ...props}) => {
    const {classes} = props;
    const {is_superuser, is_staff} = props.user;
    let id = 0;

    const item = navList
        .filter(item => {
            return isUserAllowed(is_superuser, is_staff, item)
        })
        .map(name => {
            const listName = name.name;
            const index = navList.indexOf(name);
            const {icon} = name;
            id++;

            return (
                <MenuItem
                    key={id}
                    className={classes.root}
                    button component={Link}
                    to={`/${listName}`}
                    onClick={() => onClick(index)}
                    selected={props.selected === index}
                >
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={`${firstLetterCapital(listName)}`}/>
                </MenuItem>
            );
        });

    return (
        <React.Fragment>
            {item}
        </React.Fragment>
    );
};

MainListItems.propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainListItems);