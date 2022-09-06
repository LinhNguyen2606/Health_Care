import axios from '../axios';

const saveSpecialtyService = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialties = () => {
    return axios.get('/api/get-all-specialties');
};

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

export { saveSpecialtyService, getAllSpecialties, getAllDetailSpecialtyById };
