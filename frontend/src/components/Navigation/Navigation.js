import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import classes from './Navigation.module.css';

const Navigation = () => (
    <AppBar position="fixed" className={classes.NavigationAppBar}>
        <Toolbar className={classes.NavigationToolBar}>
            <Typography variant="h6">
                Adnat (React)
            </Typography>
        </Toolbar>
    </AppBar>

);

export default Navigation;