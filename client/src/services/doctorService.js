import axios from '../axios';

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailInforDoctorsService = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export { getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService, getDetailInforDoctorsService };
