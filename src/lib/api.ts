import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5003/api', // Updated to match backend port

    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(`[API Interceptor] Token found: ${!!token}, URL: ${config.url}`);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { api };
export default api;
