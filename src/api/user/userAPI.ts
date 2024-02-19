import { instance } from '../API'
import { UserTypeWithoutPassword } from './types';
//import type { LoginApiResponse, UserTypeWithoutPasswordAndAdminAndId, UserTypeWithoutPassword } from './types'
export const employeeListApi = {
    getListData: async (): Promise<UserTypeWithoutPassword[]> => {
        const respone = await instance.get('/api/user/list', { withCredentials: true });
        return respone.data
    }
}