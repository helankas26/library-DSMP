import useAuth from "./use-auth.ts";
import useSnackbar from "./use-snackbar.ts";
import authService from "../services/api/auth.ts";

const useRefreshToken = () => {
    const {setAuth} = useAuth()!;
    const {showError} = useSnackbar();

    const refresh = async () => {
        try {
            const response = await authService.refreshToken();
            setAuth(prev => {
                return {
                    ...prev,
                    accessToken: response.data.accessToken
                }
            });

            return response.data.accessToken;
        } catch (error: any) {
            showError(error);
        }
    }

    return refresh;
};

export default useRefreshToken;