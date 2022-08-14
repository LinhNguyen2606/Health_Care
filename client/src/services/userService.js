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

const loginFacebook = (data) => {
    return axios.post('/api/facebook_login', data);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId,
        },
    });
};

export {
    handleLoginApi,
    handleRegisterApi,
    activationForEmail,
    loginFacebook,
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
};
