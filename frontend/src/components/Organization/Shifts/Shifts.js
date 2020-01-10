import React from 'react';
import MaterialTable from 'material-table';

const Shifts = props => (
    <MaterialTable
        style={{boxShadow: 'none'}}
        title="Shift"
        columns={[
            { title: 'Employee Name', field: 'name', type: 'string' },
            { title: 'Shift date', field: 'shiftDate', type: 'date' },
            { title: 'Start Time', field: 'startTime', type: 'time'},
            { title: 'Finish Time', field: 'finishTime', type: 'time'},
            { title: 'Break Length (minutes)', field: 'breakLength', type: 'numeric'},
            { title: 'Hours worked', field: 'hoursWorked' },
            { title: 'Shift cost', field: 'shiftCost', type: 'numeric'}
        ]}
        data={props.shifts}
        editable={{
        isEditable: rowData => rowData.name === "shiftDate" ||
            rowData.name === "startTime" || rowData.name === "finishTime" || rowData.name === "breakLength",
        onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
            setTimeout(() => {
                resolve();
                if (newData.shiftId){
                    props.updateShift(newData);
                } else {
                    props.createShift(newData);
                }
            }, 600);
            }),
        onRowDelete: oldData =>
            new Promise(resolve => {
            setTimeout(() => {
                resolve();
                props.deleteShift(oldData.shiftId);
            }, 600);
            }),
        }}
    />
)

export default Shifts;