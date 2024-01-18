import axios from 'axios';
import { UserData, ResponeType } from './types';
import * as CONFIG from '../../constants/config';

const instance = axios.create({ baseURL: CONFIG.BASE_URL });

const editApi = {
  fetchData: () => instance.get<ResponeType>('/api/list', { withCredentials: true }),

  saveUserChanges: (userId: string, userData: UserData) =>
    instance.post('/api/SaveUserChanges', { userId, userData }),

  deleteUser: (id: string) => instance.delete('/api/del', { data: { id }, withCredentials: true }),
};

export default editApi;
