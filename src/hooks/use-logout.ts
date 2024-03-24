import {useNavigate} from "react-router-dom";

import useAuth from "./use-auth.ts";
import useSnackbar from "./use-snackbar.ts";
import authService from "../services/api/auth.ts";

const useLogout = () => {
    const {dispatchAuth} = useAuth();
    const navigate = useNavigate();
    const {showError} = useSnackbar();

    const logout = async () => {
        dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
        navigate("/");

        try {
            await authService.logout();
        } catch (error: any) {
            showError(error);
        }
    }

    return logout;
}

export default useLogout;