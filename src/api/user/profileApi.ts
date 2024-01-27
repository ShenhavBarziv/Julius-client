import { instance } from '../API'

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
