import axios from 'axios';
import * as CONFIG from '../../constants/config';
import { UserData, ResponeType } from './types';

const instance = axios.create({ baseURL: CONFIG.BASE_URL });

const listApi = {
    getListData: async () => {
        const response = await instance.get<ResponeType>('/api/list', { withCredentials: true });
        if (!response.data.status) {
            throw new Error("Unauthorized");
        }

        return response.data;
    },
};

export default listApi;
