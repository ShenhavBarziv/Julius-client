import axios from "axios";
import * as CONFIG from "../../constants/config";

const instance = axios.create({ baseURL: CONFIG.BASE_URL });

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
