import { instance } from '../API'
import type { UserTypeWithoutPassword } from './types'
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
export const manageUsers = {
    updateUser: async (user: UserTypeWithoutPassword) => {
        const respone = await instance.put('/api/admin/manage', { user }, { withCredentials: true });
        return respone.data;
    },
    deleteUser: async (id: string) => {
        const respone = await instance.delete(`/api/admin/manage?id=${id}`, { withCredentials: true });
        return respone.data;
    },
    fetchUser: async (id: string) => {
        const respone = await instance.get(`/api/admin/manage?id=${id}`, { withCredentials: true });
        return respone.data;
    }
}