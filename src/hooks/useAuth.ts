import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {Api} from "@global/";
import {getUser} from "@state/";

export interface IRegisterState{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const useAuth = () => {
    const api = Api.getInstance();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const login = async (username: string, password: string) => {
        try {
            const {data} = await api.post("/auth/login/", {
                username,
                password,
            });

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            Api.setAuth(data.access);
            dispatch(getUser());
        } catch (err) {
            console.log(err);
        }
    };

    const register = async (registerData: IRegisterState) => {
        try {
            await api.post('/auth/signup/', {
                ...registerData,
                password_confirm: registerData.passwordConfirm
            });
            navigate('/auth/login/')
        } catch (err) {
            console.log(err);
        }
    };

    return {
        login,
        register
    }
}

export default useAuth
