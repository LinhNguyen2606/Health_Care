import axios from '../axios';

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

export { postPatientBookAppointment };
