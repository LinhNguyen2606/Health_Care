import axios from '../axios';

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};

export { postPatientBookAppointment, postVerifyBookAppointment };
