import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:2003/api',
    withCredentials: true
    //跨域
});

export default request;