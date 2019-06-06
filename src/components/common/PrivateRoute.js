import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from "../navigation/Navbar";

const PrivateRoute = ({component: Component, auth, ...rest}) => <Route {...rest} render = {props => {
    return (
        auth.isAuthenticated ? (<Navbar {...rest}><Component {...props}/></Navbar>) : (<Redirect to="/login" />)
    )}
}/>;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
