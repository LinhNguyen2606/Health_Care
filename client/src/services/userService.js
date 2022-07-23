import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const handleRegisterApi = (fullname, email, password) => {
    return axios.post('/api/register', { fullname, email, password });
};

const activationForEmail = (activation_token) => {
    return axios.post('/api/activation', activation_token);
};

export { handleLoginApi, handleRegisterApi, activationForEmail };
