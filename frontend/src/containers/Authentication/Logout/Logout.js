import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as authActions from '../../../_action/authentication.action';

const Logout = () => {
    const dispatch = useDispatch();

    const onLogout = useCallback(() => dispatch(authActions.logout()), [dispatch]);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/"/>;
};

export default Logout;