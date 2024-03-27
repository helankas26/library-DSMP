import {useLocation, useNavigate} from "react-router-dom";

import useAuth from "./use-auth.ts";
import {removeRefreshTokenExpirationDate} from "../utils/local-storage.ts";

const useLogout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {dispatchAuth} = useAuth();

    const logout = async () => {
        dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
        removeRefreshTokenExpirationDate();
        if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/books")) navigate("/auth/login", {state: {from: location}})
    }

    return logout;
}

export default useLogout;