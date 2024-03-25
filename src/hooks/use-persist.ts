import useAuth from "./use-auth.ts";
import authService from "../services/api/auth.ts";
import {useNavigate} from "react-router-dom";

const usePersist = () => {
    const {dispatchAuth} = useAuth();
    const navigate = useNavigate();

    const persist = async () => {
        try {
            const response = await authService.refreshToken();
            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: response.data.accessToken}});
        } catch (error: any) {
            dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
            navigate("/");
        }
    }

    return persist;
};

export default usePersist;