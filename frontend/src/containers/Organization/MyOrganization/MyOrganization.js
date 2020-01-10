import React, { useState, useEffect, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Form from '../../../components/Organization/Form/Form';
import Shifts from '../../../components/Organization/Shifts/Shifts';
import Button from '../../../components/UI/Button/Button';

import * as orgApi from '../../../_services/organization.api';

const OrganizationData = props => {
    const [ shifts, setShifts ] = useState([]);
    const [ name, setName ] = useState(props.org.name);
    const [ hourlyRate, setHourlyRate ] = useState(props.org.hourlyRate);
    const [ isInEditMode, setIsInEditMode ] = useState(false);
    const [ isViewingShift, setIsViewingShift ] = useState(false);
    
    const calculateCost = useCallback((startShift, finishShift, breakLength) => {
        const shiftLength = (new Date(finishShift) - new Date(startShift)) / 36e5;
        const hoursWorked = (shiftLength - (breakLength / 60)).toFixed(2);
        const shiftCost = (props.org.hourlyRate * hoursWorked).toFixed(2);
        return {
            hoursWorked,
            shiftCost
        };
    }, [ props.org.hourlyRate ]);

    const formatDate = (date) => {
        var d = new Date(date);
        return `${d.getFullYear()}-${("0" + (d.getMonth()+1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
    };

    const formatTime = (date) => {
        var d = new Date(date);
        return `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    };

    const onUpdate = event => {
        event.preventDefault();
        props.onUpdateOrganization({ ...props.org, name, hourlyRate });
        setIsInEditMode(false);
    };

    const createShift = async shiftData => {
        const inputData = {
            userId: shiftData.userId,
            start: `${formatDate(shiftData.shiftDate)} ${formatTime(shiftData.startTime)}`,
            finish: `${formatDate(shiftData.shiftDate)} ${formatTime(shiftData.finishTime)}`,
            breakLength: shiftData.breakLength
        };
        const response = await orgApi.createShift(inputData);
        if (response.data){
            let orgShiftsCopy = [ ...shifts ];
            let orgShift = orgShiftsCopy.filter(shift => shift.userId === shiftData.userId)[0];
            orgShift.shiftDate = shiftData.shiftDate;
            orgShift.startTime = shiftData.startTime;
            orgShift.finishTime = shiftData.finishTime;
            orgShift.breakLength = shiftData.breakLength;
            orgShift.hoursWorked = calculateCost(inputData.start, inputData.finish, shiftData.breakLength).hoursWorked;
            orgShift.shiftCost = calculateCost(inputData.start, inputData.finish, shiftData.breakLength).shiftCost;
            setShifts(orgShiftsCopy);
        }
    };

    const updateShift = async shiftData => {
        const inputData = {
            id: shiftData.shiftId,
            start: `${formatDate(shiftData.shiftDate)} ${formatTime(shiftData.startTime)}`,
            finish: `${formatDate(shiftData.shiftDate)} ${formatTime(shiftData.finishTime)}`,
            breakLength: shiftData.breakLength
        };
        const response = await orgApi.updateShift(inputData);
        if (response.data === "OK"){
            let orgShiftsCopy = [ ...shifts ];
            let orgShift = orgShiftsCopy.filter(shift => shift.shiftId === shiftData.shiftId)[0];
            orgShift.shiftDate = shiftData.shiftDate;
            orgShift.startTime = shiftData.startTime;
            orgShift.finishTime = shiftData.finishTime;
            orgShift.breakLength = shiftData.breakLength;
            orgShift.hoursWorked = calculateCost(inputData.start, inputData.finish, shiftData.breakLength).hoursWorked;
            orgShift.shiftCost = calculateCost(inputData.start, inputData.finish, shiftData.breakLength).shiftCost;
            setShifts(orgShiftsCopy);
        }
    };

    const deleteShift = async id => {
        const response = await orgApi.deleteShift(id);
        if (response){
            let orgShiftsCopy = [ ...shifts ];
            let orgShift = orgShiftsCopy.filter(shift => shift.shiftId === id)[0];
            orgShift.shiftId = "";
            orgShift.shiftDate = "";
            orgShift.startTime = "";
            orgShift.finishTime = "";
            orgShift.breakLength = "";
            orgShift.hoursWorked = "";
            orgShift.shiftCost = "";
            setShifts(orgShiftsCopy);
        }
    };

    useEffect(() => {
        const getShifts = async () => {
            const orgUsersResponse = await orgApi.getOrganizationUsers();
            const orgShiftsResponse = await orgApi.getOrganizationShifts();

            const orgShifts = orgUsersResponse.data.map(user => {
                const shift = orgShiftsResponse.data.filter(shift => shift.userId === user.id)[0];
                let shiftData = {};
                if (shift){
                    shiftData = {
                        shiftId: shift.id,
                        shiftDate: new Date(shift.start.split(" ")[0]),
                        startTime: new Date(shift.start),
                        finishTime: new Date(shift.finish),
                        breakLength: shift.breakLength,
                        ...calculateCost(shift.start, shift.finish, shift.breakLength)
                    };
                }

                return {
                    userId: user.id,
                    name: user.name,
                    ...shiftData
                };
            });
            setShifts(orgShifts);
        };

        getShifts();
    }, [ calculateCost ]);

    return (
        <Card style={{width: '60%', margin: '0px auto'}}>
            <CardContent>
                <h1>{props.org.name}</h1>
                <Button
                    style={{display: 'inline-block', marginRight: '5px'}} 
                    onClick={() => {setIsViewingShift(true); setIsInEditMode(false)} }>View Shift</Button>
                <Button 
                    style={{display: 'inline-block', margin: '0px 5px'}} 
                    onClick={() => {setIsInEditMode(true); setIsViewingShift(false)} }>Edit</Button>
                <Button 
                     style={{display: 'inline-block', margin: '0px 5px'}} 
                    onClick={props.onLeaveOrganization}>Leave</Button>

                {
                    isInEditMode ?
                    <Form 
                        onSubmit={onUpdate}
                        name={name}
                        hourlyRate={hourlyRate}
                        nameChanged={(event) => setName(event.target.value)}
                        hourlyRateChanged={(event) => setHourlyRate(event.target.value)}
                        text="Update Organization" 
                        btnText="Update" />
                    : null
                }

                {
                    isViewingShift ?
                        <Shifts 
                            deleteShift={deleteShift}
                            updateShift={updateShift}
                            createShift={createShift}
                            shifts={shifts} />
                    : null
                }
            </CardContent>
        </Card>
    )
}

export default OrganizationData;