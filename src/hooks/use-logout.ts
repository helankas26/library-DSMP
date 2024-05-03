import {useLocation, useNavigate} from "react-router-dom";

import useAuth from "./use-auth.ts";
import authService from "../services/api/auth.ts";
import {removeRefreshTokenExpirationDate} from "../utils/local-storage.ts";
import useSnackbar from "./use-snackbar.ts";

const useLogout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {dispatchAuth} = useAuth();
    const {showAlert} = useSnackbar();

    const logout = async () => {
        await authService.logout();
        dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
        removeRefreshTokenExpirationDate();
        if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/books")) navigate("/auth/login", {state: {from: location}})
        showAlert("Automatically logout. Please login again!", 'warning');
    }

    return logout;
}

export default useLogout;