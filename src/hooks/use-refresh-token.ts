import useAuth from "./use-auth.ts";
import authService from "../services/api/auth.ts";
import {removeRefreshTokenExpirationDate} from "../utils/local-storage.ts";

const useRefreshToken = () => {
    const {dispatchAuth} = useAuth();

    const refresh = async () => {
        try {
            const response = await authService.refreshToken();
            const {accessToken} = response.data;
            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: accessToken}});

            return accessToken;
        } catch (error: any) {
            dispatchAuth({type: 'LOGOUT', auth: {accessToken: undefined, profile: undefined}});
            removeRefreshTokenExpirationDate();
        }
    }

    return refresh;
};

export default useRefreshToken;