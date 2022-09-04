import axios from '../axios';

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

export { createNewSpecialty };
