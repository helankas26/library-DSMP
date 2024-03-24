import useAuth from "./use-auth.ts";
import authService from "../services/api/auth.ts";

const useRefreshToken = () => {
    const {dispatchAuth} = useAuth();

    const refresh = async () => {
        try {
            const response = await authService.refreshToken();
            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: response.data.accessToken}});

            return response.data.accessToken;
        } catch (error: any) {
            dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
        }
    }

    return refresh;
};

export default useRefreshToken;