import axios from '../_config/axios';

export const get = () => {
    return axios.get('/organisations');
};

export const createAndJoin = (orgData) => {
    return axios.post('/organisations/create_join', orgData);
};

export const join = (orgData) => {
    return axios.post('/organisations/join', orgData);
};

export const update = (orgData) => {
    return axios.put(`/organisations/${orgData.id}`, orgData);
};

export const leave = () => {
    return axios.post('/organisations/leave');
};

export const getOrganizationUsers = () => {
    return axios.get('/users');
};

export const getOrganizationShifts = () => {
    return axios.get('/shifts');
};

export const createShift = (shiftData) => {
    return axios.post('/shifts', shiftData);
};

export const updateShift = (shiftData) => {
    return axios.put(`/shifts/${shiftData.id}`, shiftData);
};

export const deleteShift = (id) => {
    return axios.delete(`/shifts/${id}`);
};