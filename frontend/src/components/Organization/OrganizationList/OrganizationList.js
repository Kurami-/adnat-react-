import React from 'react';
import MaterialTable from 'material-table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const OrganizationList = props => (
<Card style={{height: '100%'}}>
    <CardContent>
        <MaterialTable
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Join',
                    onClick: (event, rowData) => {
                        event.preventDefault();
                        props.onJoinOrganization(rowData.id);
                    }
                }
            ]}
            title="Organizations"
            style={{boxShadow: 'none'}}
            columns={ [
                { title: 'Name', field: 'name' },
                { title: 'Hourly Rate', field: 'hourlyRate', type: 'numeric' },
              ]}
            data={props.orgList}
            editable={{
                isDeletable: rowData => rowData !== "name" || rowData !== "hourlyRate",
                onRowAdd: newData =>{},
                onRowUpdate: (newData, oldData) =>{
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (newData){
                                props.onUpdateOrganization(newData);
                            }
                        }, 600);
                    })
                },
                onRowDelete: oldData =>{},
            }}
            options={{
                filtering: false,
                grouping: false,
                search: false
              }}
            />
    </CardContent>
</Card>
);

export default OrganizationList;