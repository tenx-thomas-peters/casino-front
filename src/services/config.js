import axios from 'axios';

const service = axios.create({
    // dragon
    baseURL: `http://localhost:9091/casino/api/`, //YOUR_API_URL HERE
    // baseURL: `http://137.220.176.12:9091/casino/api/`, //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    timeout: 100000
});

service.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['X-Access-Token'] = token;
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';

    return config;
}, (error) => {
    return Promise.reject(error)
});

export default service;