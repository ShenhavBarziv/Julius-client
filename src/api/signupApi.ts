// api/signupApi.js
import axios from 'axios';
import * as CONFIG from '../constants/config';
type userData = {
    email: string,
    password: string,
    name: string,
    job: string,
    birthDate: string,
    phoneNumber: string,
    position: string,
    hireDate: string
};
const instance = axios.create({ baseURL: CONFIG.BASE_URL });

const signupApi = {
    signUpUser: async (userData: userData) => {
        try {
            const response = await instance.post('/api/register', userData, { withCredentials: true });

            if (response.data.code === 201) {
                return { success: true, message: "New user created successfully" };
            } else if (response.data.code === 409) {
                return { success: false, message: "User already exists" };
            } else if (response.data.code === 400) {
                return { success: false, message: response.data.msg };
            } else {
                return { success: false, message: "Error creating user" };
            }
        } catch (error) {
            console.error('Error during signup API request:', error);
            throw new Error("Error during signup API request");
        }
    },
};

export default signupApi;
