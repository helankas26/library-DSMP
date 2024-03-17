import {useEffect} from "react";
import AxiosInstance from "../config/axios-instance.ts";
import useRefreshToken from "./use-refresh-token.ts";
import useAuth from "./use-auth.ts";

const useAxiosInstance = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth()!;

    useEffect(() => {
        const requestInterceptor = AxiosInstance.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = AxiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return AxiosInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            AxiosInstance.interceptors.request.eject(requestInterceptor);
            AxiosInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refresh])

    return AxiosInstance;
}

export default useAxiosInstance;