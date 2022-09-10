import axios from '../axios';

const createClinicService = (data) => {
    return axios.post('/api/create-new-clinic', data);
};

const getAllClinics = () => {
    return axios.get('/api/get-all-clinics');
};

const editClinicService = (data) => {
    return axios.put(`/api/edit-clinic`, data);
};

const deleteClinicService = (clinicId) => {
    return axios.delete(`/api/delete-clinic`, {
        data: {
            id: clinicId,
        },
    });
};

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

export { createClinicService, getAllClinics, getAllDetailClinicById, editClinicService, deleteClinicService };
