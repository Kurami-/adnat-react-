import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

import Navigation from '../../../components/Navigation/Navigation';
import RegisterForm from '../../../components/Authentication/Register/Register';

import classes from './Register.module.css';

import * as authActions from '../../../_action/authentication.action';

const Register = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setCPassword ] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.register_error);

    const onRegister = event => {
        event.preventDefault();
        dispatch(authActions.signup({ email, password, name, passwordConfirmation }));
    };

    return (
        <div className={classes.Register}>
            <Navigation />
            <div className={classes.RegisterFormContainer}>
                <RegisterForm
                    error={error ? <Alert severity="error">{error}</Alert> : null}
                    name={name}
                    nameChanged={(event) => setName(event.target.value)}
                    email={email}
                    emailChanged={(event) => setEmail(event.target.value)}
                    password={password}
                    passwordChanged={(event) => setPassword(event.target.value)}
                    cpassword={passwordConfirmation}
                    cpasswordChanged={(event) => setCPassword(event.target.value)}
                    onRegister={onRegister}
                />
            </div>
        </div>
    );
};

export default Register;