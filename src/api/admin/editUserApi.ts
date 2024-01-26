import axios from 'axios';
import { UserData, ResponeType, ResponeTypeUser } from './types';
import * as CONFIG from '../../constants/config';
import { instance } from '../API'
const editApi = {
  fetchData: () => instance.get<ResponeType>('/api/list', { withCredentials: true }),
  fetchUser: (userId: number) => instance.get<ResponeTypeUser>(`/api/EditUser?id=${userId}`, { withCredentials: true }),
  saveUserChanges: (userData: UserData | null) =>
    instance.post('/api/SaveUserChanges', { userData }),

  deleteUser: (id: string) => instance.delete('/api/del', { data: { id }, withCredentials: true }),
};

export default editApi;
