import { useNavigate } from 'react-router-dom';
import { useApi } from '@hooks/';
import { API_URL } from '@config/';

const useAuth = () => {
    const api = useApi();
    const navigate = useNavigate()

    const login = async ({ username, password }) => {
        try {
            const { data } = await api.post(`${ API_URL }/auth/login/`, { username, password });
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            api.defaults.headers['Authorization'] = `JWT ${ data.access }`;
        } catch (err) {
            console.log(err);
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            api.defaults.headers['Authorization'] = null;
            navigate('/auth/login');
        } catch (err) {
            console.log(err);
        }
    }

    const register = async user => {
        try {
            await api.post(`${ API_URL }/auth/signup/`, { user });
            navigate('/auth/login');
        } catch (err) {
            console.log(err);
        }
    }


    return {
        login,
        logout,
        register
    }

}

export default useAuth;