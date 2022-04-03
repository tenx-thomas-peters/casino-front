import axios from 'axios';
import {CommonConstants} from '../routes/components/Common/Constants';

const gameService = axios.create({
    baseURL: `https://api.honorlink.org/api/`, //GAME_SERVER_API_URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 100000
});

gameService.interceptors.request.use(config => {
    const token = localStorage.getItem('server_token');
   
    config.headers['Authorization'] = 'Bearer ' + CommonConstants.apiKey;
   
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';

console.log("333");
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default gameService;