import axios from 'axios';
import * as CONFIG from '../../constants/config';

const instance = axios.create({ baseURL: CONFIG.BASE_URL });
const adminApi = {
    checkAdminStatus: async () => {
        const response = await instance.get('/api/profile', { withCredentials: true });
        if (!response.data.status) {
            throw new Error("Unauthorized");
        }
        const isAdminUser = response.data.user && response.data.user.admin;
        if (!isAdminUser) {
            throw new Error("Access Denied");
        }
        return isAdminUser;
    },
};

export default adminApi;
