import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const Register = props => (
<Card>
    <CardContent>
        <h1>Register</h1>
        <Divider />
        {props.error}
        <form onSubmit={props.onRegister}>
            <Input 
                label="Name" 
                onChange={props.nameChanged}
                value={props.name}
                required
                type="name"
            />
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
            <Input 
                label="Confirm Password" 
                onChange={props.cpasswordChanged}
                value={props.cpassword}
                required
                type="password"
            />
            <Button type="submit">Register</Button>
        </form>
        <span>Already have an account? <NavLink to="/user/login">Login</NavLink> here.</span>
    </CardContent>
</Card>
);

export default Register;