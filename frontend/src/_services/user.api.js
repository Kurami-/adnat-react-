import axios from '../_config/axios';

export const getMe = () => {
    return axios.get('/users/me');
};