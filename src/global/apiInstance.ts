import axios from 'axios';
import { getFromLocalStorage } from '@utils/';
import { API_URL } from '@config/';

const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

apiInstance.defaults.headers.common[
  'Authorization'
] = `JWT ${getFromLocalStorage('accessToken')}`;

export { apiInstance };
