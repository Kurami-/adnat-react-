import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

import Navigation from '../../../components/Navigation/Navigation';
import LoginForm from '../../../components/Authentication/Login/Login';

import classes from './Login.module.css';

import * as authActions from '../../../_action/authentication.action';

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.login_error);

    const onLogin = event => {
        event.preventDefault();
        dispatch(authActions.login({ email, password }));
    };

    return (
        <div className={classes.Login}>
            <Navigation />
            <div className={classes.LoginFormContainer}>
                <LoginForm
                    error={error ? <Alert severity="error">{error}</Alert> : null}
                    email={email}
                    password={password}
                    emailChanged={(event) => setEmail(event.target.value)}
                    passwordChanged={(event) => setPassword(event.target.value)}
                    onLogin={onLogin} />
            </div>
        </div>
    )
};

export default Login;