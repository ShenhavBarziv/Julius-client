import { ResponeType } from './types';
import { instance } from '../API'

const employeeListApi = {
    getListData: async () => {
        const response = await instance.get<ResponeType>('/api/list', { withCredentials: true });
        if (!response.data.status) {
            throw new Error("Unauthorized");
        }

        return response.data;
    },
};

export default employeeListApi;
