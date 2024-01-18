import axios from 'axios';
import * as CONFIG from '../../constants/config';

const instance = axios.create({ baseURL: CONFIG.BASE_URL });

const approveApi = {
    fetchData: async () => {
        try {
            const response = await instance.get('/api/approve', { withCredentials: true });

            if (response.data.status === true) {
                return { success: true, data: response.data.data, admin: true };
            } else if (response.data.status === 'notAdmin') {
                return { success: false, message: 'notAdmin' };
            } else {
                return { success: false, message: 'notLoggedIn' };
            }
        } catch (error) {
            console.error('Error fetching data:', error);

            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.status) {
                    return { success: false, message: error.response.data.status };
                } else {
                    throw new Error("Error");
                }
            }
            throw new Error("Error");
        }
    },

    approveUser: async (id: string) => {
        try {
            console.log('Approving user with id: ', id);
            const response = await instance.post('/api/approve', { id }, { withCredentials: true });

            if (response.data.status !== 200) {
                if (typeof response.data.status === 'string') {
                    return { success: false, message: response.data.status };
                } else {
                    return { success: false, message: 'User not found' };
                }
            }
            return { success: true, message: 'User approved successfully' };
        } catch (error) {
            console.error('Error approving user: ', error);
            return { success: false, message: 'Error' };
        }
    },

    deleteUser: async (id: string) => {
        try {
            console.log('Deleting user with id: ', id);
            const response = await instance.delete('/api/approve', {
                data: { id },
                withCredentials: true,
            });

            if (response.data.status !== 200) {
                if (typeof response.data.status === 'string') {
                    return { success: false, message: response.data.status };
                } else {
                    return { success: false, message: 'User not found' };
                }
            }
            return { success: true, message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user: ', error);
            return { success: false, message: 'Error' };
        }
    },
};

export default approveApi;
