import axios from '../axios';

const createSpecialtyService = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const editSpecialtyService = (data) => {
    return axios.put(`/api/edit-specialty`, data);
};

const deleteSpecialtyService = (specialtyId) => {
    return axios.delete(`/api/delete-specialty`, {
        data: {
            id: specialtyId,
        },
    });
};

const getAllSpecialties = () => {
    return axios.get('/api/get-all-specialties');
};

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

export {
    createSpecialtyService,
    getAllSpecialties,
    getAllDetailSpecialtyById,
    editSpecialtyService,
    deleteSpecialtyService,
};
