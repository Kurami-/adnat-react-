import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const Form = props => (
<Card style={{height: '100%'}}>
    <CardContent>
        <h3>{props.text}</h3>
        <Divider />
        <form onSubmit={props.onSubmit}>
            <Input 
                label="Name" 
                onChange={props.nameChanged}
                value={props.name}
                required
                type="text"
            />
            <Input 
                label="Hourly Rate" 
                onChange={props.hourlyRateChanged}
                value={props.hourlyRate}
                required
                type="number"
            />
            <Button type="submit">{props.btnText}</Button>
        </form>
    </CardContent>
</Card>
);

export default Form;