import axios from '../axios';

const createConversationService = (data) => {
    return axios.post(`/api/conversation/`, data);
};

export { createConversationService };
