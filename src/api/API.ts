import axios from 'axios';
import * as CONFIG from '../constants/config';

export const instance = axios.create({ baseURL: CONFIG.BASE_URL });