// api/profileApi.js
import axios from 'axios';
import * as CONFIG from '../../constants/config';

const instance = axios.create({ baseURL: CONFIG.BASE_URL });

const profileApi = {
    getUserProfile: async () => {
        const response = await instance.get('/api/profile', { withCredentials: true });

        if (!response.data.status) {
            throw new Error("Unauthorized");
        }

        return response.data.user;
    },
};

export default profileApi;
