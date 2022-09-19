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

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId,
        },
    });
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data);
};

export {
    handleLoginApi,
    handleRegisterApi,
    activationForEmail,
    loginFacebook,
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    editUserService,
    deleteUserService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
};
