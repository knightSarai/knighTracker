import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';
import { getFromLocalStorage } from '@utils/';
import { API_URL } from '@config/';

export class Api {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    return Api.createInstance();
  }

  static setAuth(token: string) {
    if (!Api.instance) throw new Error('ApiInstance is not initialized');
    Api.instance.defaults.headers.common['Authorization'] = `JWT ${token}`;
  }

  private static createInstance() {
    if (!Api.instance) {
      Api.instance = axios.create({
        baseURL: API_URL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      const token = getFromLocalStorage('accessToken');
      if (token) Api.setAuth(token);
      Api.addInterceptors();
    }
    return Api.instance;
  }

  private static addInterceptors() {
    const responseWithInvalidToken = (res: AxiosResponse) =>
      res.status === 401 &&
      res.data.code === 'token_not_valid' &&
      res.statusText === 'Unauthorized';

    const onResponse = (response: AxiosRequestConfig) => response;

    const onErrorResponse = async (resError: AxiosError) => {
      try {
        const { response: res, config } = resError;
        if (!res || !config) return Promise.reject(resError);

        const refreshToken = getFromLocalStorage('refreshToken');

        if (!refreshToken) return Promise.reject(resError);

        const decodedRefreshToken = jwt_decode<JwtPayload>(refreshToken);
        const exp = decodedRefreshToken.exp;
        if (!exp) return Promise.reject(resError);
        const isRefreshTokenExpired = dayjs.unix(exp).diff(dayjs()) < 1;

        if (!responseWithInvalidToken(res) || isRefreshTokenExpired)
          return Promise.reject(resError);

        return Api.instance
          .post('/auth/token/refresh/', { refresh: refreshToken })
          .then((response) => {
            localStorage.setItem('accessToken', response.data.access);
            Api.setAuth(response.data.access);
            if (!config.headers) return Promise.reject(resError);
            config.headers['Authorization'] = 'JWT ' + response.data.access;
            return Api.instance(config);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        return Promise.reject(resError);
      }
    };

    Api.instance.interceptors.response.use(onResponse, onErrorResponse);
  }
}
