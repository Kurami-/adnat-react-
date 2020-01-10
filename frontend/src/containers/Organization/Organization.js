import React, { useState, useEffect }  from 'react';
import Navigation from '../../components/Navigation/Navigation';
import MyOrganization from './MyOrganization/MyOrganization';
import Dashboard from '../../components/Organization/Dashboard/Dashboard';

import classes from './Organization.module.css';

import * as userApi from '../../_services/user.api';
import * as orgApi from '../../_services/organization.api';

const Organization = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ currentOrg, setCurrentOrg ] = useState("");
    const [ currentUser, setCurrentUser ] = useState("");
    const [ orgList, setOrgList ] = useState([]);
    const [ name, setName ] = useState("");
    const [ hourlyRate, setHourlyRate ] = useState("");

    const onCreateAnJoinOrg = async event => {
        event.preventDefault();
        
        const response = await orgApi.createAndJoin({ name, hourlyRate });
        if (response.data){
            let orgListCopy = [ ...orgList ];
            orgListCopy.push(response.data);
            setOrgList(orgListCopy);
            setCurrentOrg(response.data);
        }
    };

    const onJoinOrganization = async (organisationId) => {
        const response = await orgApi.join({ organisationId: organisationId });
        if (response.data){
            setCurrentOrg(response.data);
        }
    };

    const onLeaveOrganization = async orgId => {
        const response = await orgApi.leave(orgId);
        if (response.data === "OK"){
            setCurrentOrg("");
        }
    };

    const onUpdateOrganization = async (updatedData) => {
        const response = await orgApi.update(updatedData);
        if (response.data === "OK"){
            const orgListCopy = [ ...orgList ];
            const updateOrg = orgListCopy.filter(org => org.id === updatedData.id)[0];
            if (updateOrg){
                updateOrg.name = updatedData.name;
                updateOrg.hourlyRate = updatedData.hourlyRate;
                setOrgList(orgListCopy);
            }
        }
    };

    useEffect(() => {
        const getCurrentPageData = async() => {
            setIsLoading(true);
            const currentUserRes = await userApi.getMe();
            const orgListRes = await orgApi.get();
            setCurrentUser(currentUserRes.data);
            setOrgList(orgListRes.data);
            if (currentUserRes.data.organisationId){
                setCurrentOrg(orgListRes.data.filter(org => org.id === currentUserRes.data.organisationId)[0]);
            }
            setIsLoading(false);
        };

        getCurrentPageData();
    }, []);

    
    console.log(
        currentUser,
        currentOrg,
        orgList
    )

    return (
        <div className={classes.Organization}>
            <Navigation />
            <h1>Welcome, John Smith</h1>
            {/* <span><NavLink to="/user/logout">Logout</NavLink></span> */}
            {
                isLoading ? null :
                currentOrg ?
                <MyOrganization
                    onUpdateOrganization={onUpdateOrganization}
                    onLeaveOrganization={onLeaveOrganization}
                    org={currentOrg} /> : 
                <Dashboard 
                    onJoinOrganization={onJoinOrganization}
                    onUpdateOrganization={onUpdateOrganization}
                    orgList={orgList}
                    onCreateAnJoinOrg={onCreateAnJoinOrg}
                    name={name}
                    hourlyRate={hourlyRate}
                    namedChanged={(event) => setName(event.target.value)}
                    hourlyRateChanged={(event) => setHourlyRate(event.target.value)}
                    />
            }
        </div>
    );
};

export default Organization;