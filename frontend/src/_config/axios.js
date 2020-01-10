import axios from "axios";

const adapter = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: localStorage.getItem('adnatSessionId'),
        "Content-Type": "application/json"
    }
});

export default adapter;
