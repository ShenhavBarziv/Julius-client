import { instance } from '../API'
import type { LoginApiResponse, UserTypeWithoutPasswordAndAdminAndId, UserTypeWithoutPassword } from './types'
export const verificationApi = {
    verification: async (): Promise<null | UserTypeWithoutPassword> => {
        const respone = await instance.get('/api/user/verification', { withCredentials: true });
        return respone.data
    }
}
export const loginApi = {
    loginUser: async (email: string, password: string): Promise<LoginApiResponse> => {
        const response = await instance.post(
            "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    },
    logout: async () => {
        await instance.get(
            "/api/auth/logout",
            { withCredentials: true }
        );
    }
};
export const signupApi = {
    signUpUser: async (userData: UserTypeWithoutPasswordAndAdminAndId) => {
        try {
            const response = await instance.post('/api/user/register', userData, { withCredentials: true });
            console.log(response.data)
            if (response.data.code === 201) {
                return { success: true, message: "A new user created successfully" };
            } else if (response.data.code === 409) {
                return { success: false, message: "User already exists" };
            } else if (response.data.code === 400) {
                return { success: false, message: response.data.msg as string };
            } else {
                return { success: false, message: "Error creating user" };
            }
        } catch (error) {
            console.error('Error during signup API request:', error);
            return { success: false, message: "Error creating user" };
        }
    },
};