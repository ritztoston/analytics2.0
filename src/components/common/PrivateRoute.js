import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from "../navigation/Navbar";
import isUserAllowed from "../../utils/isUserAllowed";
import checkAuth from "../../utils/checkAuth";

const PrivateRoute = ({component: Component, auth, ...rest}) => <Route {...rest} render = {props => {
    const content = <Navbar {...rest}><Component {...props}/></Navbar>;
    checkAuth(2);

    if (auth.isAuthenticated) {
        const payload = {
            'is_staff': rest.is_staff,
            'user': rest.is_user
        };

        if(isUserAllowed(auth.user.is_superuser, auth.user.is_staff, payload)) return content;
        else return <Redirect to="/restricted-access"/>;
    }
    else
        return <Redirect to="/login"/>;
}}/>;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
