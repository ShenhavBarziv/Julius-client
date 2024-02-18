import { instance } from '../API'
//import type { UserType, UserTypeWithoutPassword } from './types'
export const approveApi = {
    approveUser: async (id: string) => {
        const respone = await instance.post('/api/admin/approve', { id: id }, { withCredentials: true });
        return respone.data;
    },
    deleteUser: async (id: string) => {
        const response = await instance.delete(`/api/admin/approve?id=${id}`, { withCredentials: true });
        return response.data;
    },
    list: async () => {
        const respone = await instance.get('/api/admin/approve', { withCredentials: true });
        return respone.data;
    },
}