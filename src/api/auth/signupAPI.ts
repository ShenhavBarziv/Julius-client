import { instance } from '../API'
import type { userData } from './types'

const signupApi = {
    signUpUser: async (userData: userData) => {
        try {
            const response = await instance.post('/api/register', userData, { withCredentials: true });

            if (response.data.code === 201) {
                return { success: true, message: "New user created successfully" };
            } else if (response.data.code === 409) {
                return { success: false, message: "User already exists" };
            } else if (response.data.code === 400) {
                return { success: false, message: response.data.msg as string };
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