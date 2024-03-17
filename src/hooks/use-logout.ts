import useAuth from "./use-auth.ts";
import useSnackbar from "./use-snackbar.ts";
import authService from "../services/api/auth.ts";

const useLogout = () => {
    const {setAuth} = useAuth()!;
    const {showError} = useSnackbar();

    const logout = async () => {
        setAuth({accessToken: undefined, profile: null});

        try {
            await authService.logout();
        } catch (error: any) {
            showError(error);
        }
    }

    return logout;
}

export default useLogout;