import axios from '../axios';

const saveSpecialtyService = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialties = () => {
    return axios.get('/api/get-all-specialties');
};

export { saveSpecialtyService, getAllSpecialties };
