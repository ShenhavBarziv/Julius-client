import { instance } from '../API'

const loginApi = {
    loginUser: async (email: string, password: string) => {
        const response = await instance.post(
            "/api/login",
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    },
};

export default loginApi;
