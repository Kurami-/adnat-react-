import axios from "axios";

// const instance = axios.create({
//     //baseURL: 'http://localhost:3001'
//     baseURL: 'https://d081df88.ngrok.io'
// });

// instance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('adnatSessionId');
//         if (token) {
//             console.log("token = ", token);
//             config.headers.Authorization = 'Bearer ' + token;
//         }
//         return config;
//     }
// )

const adapter = axios.create({
    baseURL: 'https://602ef4fb.ngrok.io',
    headers: {
        Authorization: localStorage.getItem('adnatSessionId'),
        "Content-Type": "application/json"
    }
});

export default adapter;
