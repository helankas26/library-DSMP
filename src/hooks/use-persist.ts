import {useLocation, useNavigate} from "react-router-dom";

import useAuth from "./use-auth.ts";
import authService from "../services/api/auth.ts";
import {removeRefreshTokenExpirationDate} from "../utils/local-storage.ts";

const usePersist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {dispatchAuth} = useAuth();

    const persist = async () => {
        try {
            const response = await authService.refreshToken();
            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: response.data.accessToken}});
        } catch (error: any) {
            dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
            removeRefreshTokenExpirationDate();
            if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/books")) navigate("/auth/login", {state: {from: location}})
        }
    }

    return persist;
};

export default usePersist;