import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { apiInstance } from "@global/"
import { getFromLocalStorage } from '@utils/';


export const useApi = () => {

    const responseWithInvalidToken = res => (
        res.status === 401 &&
        res.data.code === 'token_not_valid' &&
        res.statusText === 'Unauthorized'
    );

    const beforeRequest = response => response;

    const onErrorResponse = async resError => {
        try {
            const { response: res, config } = resError;
            const refreshToken = getFromLocalStorage("refreshToken");

            if (!refreshToken) return Promise.reject(resError);

            const decodedRefreshToken = jwt_decode(refreshToken);
            const isRefreshTokenExpired = dayjs.unix(decodedRefreshToken.exp).diff(dayjs()) < 1;

            if (!responseWithInvalidToken(res) || isRefreshTokenExpired) return Promise.reject(resError);

            return apiInstance
                .post('/auth/token/refresh/', { refresh: refreshToken })
                .then(response => {
                    localStorage.setItem('accessToken', response.data.access);
                    apiInstance.defaults.headers.common['Authorization'] = 'JWT ' + response.data.access;
                    config.headers['Authorization'] = 'JWT ' + response.data.access;

                    return apiInstance(config);
                })
                .catch(err => console.log(err));

        } catch (err) {
            console.log(err);
            return Promise.reject(resError);
        }
    }

    apiInstance.interceptors.response.use(beforeRequest, onErrorResponse);
    return apiInstance
}
