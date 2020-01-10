import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const Login = props => (
    <Card>
        <CardContent>
            <h1>Login</h1>
            <Divider />
            {props.error}
            <form onSubmit={props.onLogin}>
                <Input 
                    label="Email" 
                    onChange={props.emailChanged}
                    value={props.email}
                    required
                    type="email"
                />
                <Input 
                    label="Password" 
                    onChange={props.passwordChanged}
                    value={props.password}
                    required
                    type="password"
                />
                <Button type="submit">Login</Button>
            </form>
            <span>Don't have an account? <NavLink to="/user/register">Sign Up</NavLink> here.</span>
        </CardContent>
    </Card>
);

export default Login;