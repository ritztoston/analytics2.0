import DashboardIcon from '@material-ui/icons/Dashboard';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import React from "react";

const is_staff = true, user = false;

export const navList = [
    {name: 'dashboard', icon: <DashboardIcon/>, is_staff, user: true},
    {name: 'campaigns', icon: <Email/>, is_staff, user},
    {name: 'subscribers', icon: <Person/>, is_staff, user},
];