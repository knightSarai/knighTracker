import {useDispatch} from "react-redux";
import {Api} from "@global/";
import {getUser} from "@state/";

export const useAuth = () => {
    const api = Api.getInstance();
    const dispatch = useDispatch();

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

    return {
        login
    }
}

export default useAuth
