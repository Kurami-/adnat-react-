import React from 'react';
import Grid from '@material-ui/core/Grid';

import OrganizationList from '../OrganizationList/OrganizationList';
import Form from '../Form/Form';

const Dashboard = props => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <OrganizationList
                onJoinOrganization={props.onJoinOrganization}
                onUpdateOrganization={props.onUpdateOrganization}
                orgList={props.orgList} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Form 
                onSubmit={props.onCreateAnJoinOrg}
                name={props.name}
                hourlyRate={props.hourlyRate}
                nameChanged={props.namedChanged}
                hourlyRateChanged={props.hourlyRateChanged}
                text="Create And Join Organization" 
                btnText="Create And Join" />
        </Grid>
    </Grid>
);

export default Dashboard;