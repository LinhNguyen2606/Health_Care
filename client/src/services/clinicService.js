import axios from '../axios';

const createClinicService = (data) => {
    return axios.post('/api/create-new-clinic', data);
};

// const editSpecialtyService = (data) => {
//     return axios.put(`/api/edit-specialty`, data);
// };

// const deleteSpecialtyService = (specialtyId) => {
//     return axios.delete(`/api/delete-specialty`, {
//         data: {
//             id: specialtyId,
//         },
//     });
// };

// const getAllSpecialties = () => {
//     return axios.get('/api/get-all-specialties');
// };

// const getAllDetailSpecialtyById = (data) => {
//     return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
// };

export {
    createClinicService,
    // getAllSpecialties,
    // getAllDetailSpecialtyById,
    // editSpecialtyService,
    // deleteSpecialtyService,
};
