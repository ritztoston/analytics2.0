import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Toolbar, AppBar, Drawer, CssBaseline, Typography, IconButton
} from '@material-ui/core';
import {Menu as MenuIcon, AccountCircle} from '@material-ui/icons';
import withStyles from "@material-ui/core/styles/withStyles";
import {headerImage} from "../../images/dataimg";
import Hidden from "@material-ui/core/Hidden";
import MainListItems from "./MainListItems";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import LinearBuffer from "../common/LinearBuffer";
import {withRouter} from "react-router-dom";
import {navList} from "./navList";
import {logoutUser} from "../../actions/authActions";
import connect from "react-redux/es/connect/connect";

const drawerWidth = 220;

const ElevationScroll = props => {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#303030',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#303030',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const styles = theme => ({
    root: {
        display: 'flex',
        position: 'relative',
    },
    toolbarImg: {
        maxWidth: 150,
        width: '100%',
        height: 'auto',
        userSelect: 'none',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: theme.spacing(7) + 1,
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(9) + 1,
            width: `calc(100% - ${theme.spacing(9) + 1}px)`,
        },
    },
    appBarM: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    typoNav: {
        padding: '20px 20px 5px 20px',
        fontSize: '12px',
        transition: '.4s all',
        color: '#a2a0a2',
    },
    typoNavClose: {
        opacity: 0,
    },
    drawer: {
        zIndex: theme.zIndex.drawer + 5,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        marginTop: 5,
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        position: 'relative',
        paddingTop: 4 + theme.spacing(3),
    },
    contentM: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        position: 'relative',
        paddingTop: 4 + theme.spacing(3),
    },
    contentShiftM: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    contentLoading: {
        paddingTop: theme.spacing(3),
    },
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            anchorEl: null,
            index: 0,
        };
    }

    componentDidMount() {
        const pathname = this.props.location.pathname.split('/')[1];

        navList.map(item => {
            if(pathname === item.name) {
                const index = navList.indexOf(item);
                this.setState({index})
            }
            return null;
        });
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleSelectMenu = index => {
        this.setState({index});
    };

    handleDrawerBufferClick = index => {
        this.handleDrawerOpen();
        this.handleSelectMenu(index);
    };

    render() {
        const {classes, uiTheme, loading, children} = this.props;
        const {open, anchorEl, index} = this.state;

        const apps = (<div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleMenuOpen}
                >
                    <AccountCircle style={{fontSize: 30}}/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    className={classes.menu}
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={anchorEl}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem>Profile</MenuItem>
                    <Divider/>
                    <MenuItem onClick={this.props.handleChangeTheme}>
                        Dark Mode&nbsp;&nbsp;
                        <IOSSwitch
                            checked={uiTheme === 'dark'}
                            onChange={this.props.handleChangeTheme}
                        />
                    </MenuItem>
                    <MenuItem onClick={this.props.logoutUser}>Logout</MenuItem>
                </Menu>
            </div>);
        const content = (<React.Fragment>
                <div className={classes.toolbar}/>
                {children}
            </React.Fragment>);

        return (
            <React.Fragment>
                {loading.buffer && (<LinearBuffer/>)}
                <div className={classes.root}>
                    <CssBaseline/>
                    <Hidden mdUp>
                        <ElevationScroll {...this.props}>
                            <AppBar
                                color={'inherit'}
                                position="fixed"
                                className={clsx(classes.appBarM, {
                                    [classes.appBarShift]: !open,
                                })}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={!open ? this.handleDrawerOpen : this.handleDrawerClose}
                                        edge="start"
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}/>
                                    {apps}
                                </Toolbar>
                            </AppBar>
                        </ElevationScroll>
                        <Drawer
                            variant="persistent"
                            className={classes.drawer}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: !open,
                                }),
                            }}
                            open={!open}
                        >
                            <div className={classes.toolbar}>
                                <img className={classes.toolbarImg}
                                     src={`data:image/png;base64,${headerImage}`}
                                     alt="SalesRobot Logo"/>
                            </div>
                            <Typography className={clsx(classes.typoNav, {[classes.typoNavClose]: this.state.open,})}
                                        color="inherit" noWrap>
                                MAIN
                            </Typography>
                            <MainListItems onClick={!open ? this.handleDrawerBufferClick.bind(this) : this.handleDrawerClose} selected={index}/>
                        </Drawer>
                        <main
                            className={clsx(classes.contentM, {
                                [classes.contentShiftM]: !open,
                                [classes.contentLoading]: loading.buffer,
                            })}
                        >
                            {content}
                        </main>
                    </Hidden>
                    <Hidden smDown>
                        <ElevationScroll {...this.props}>
                            <AppBar
                                color={'inherit'}
                                position="fixed"
                                className={clsx(classes.appBar, {
                                    [classes.appBarShift]: open,
                                })}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={!open ? this.handleDrawerOpen : this.handleDrawerClose}
                                        edge="start"
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}/>
                                    {apps}
                                </Toolbar>
                            </AppBar>
                        </ElevationScroll>
                        <Drawer
                            variant="permanent"
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            })}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open,
                                }),
                            }}
                            open={open}
                        >
                            <div className={classes.toolbar}>
                                <img className={classes.toolbarImg}
                                     src={`data:image/png;base64,${headerImage}`}
                                     alt="SalesRobot Logo"/>
                            </div>
                            <Typography className={clsx(classes.typoNav, {[classes.typoNavClose]: !this.state.open,})}
                                        color="inherit" noWrap>
                                MAIN
                            </Typography>
                            <MainListItems onClick={this.handleSelectMenu.bind(this)} selected={index}/>
                        </Drawer>
                        <main className={clsx(classes.content, {
                            [classes.contentLoading]: loading.buffer,
                        })}>
                            {content}
                        </main>
                    </Hidden>
                </div>
            </React.Fragment>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    loading: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    handleChangeTheme: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.loading,
    settings: state.settings
});

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(withRouter(Navigation)));