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

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const deleteDoctorService = (doctorId) => {
    return axios.delete(`/api/delete-doctor`, {
        data: {
            id: doctorId,
        },
    });
};

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

export {
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInforDoctorsService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    deleteDoctorService,
};
