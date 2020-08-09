import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.103:3333' //Usar o endereço IP
});

export default api;
