import axios from '../_config/axios';

export const login = (authData) => {
    return axios.post('/auth/login', authData);
};

export const signup = (authData) => {
    return axios.post('/auth/signup', authData)
};