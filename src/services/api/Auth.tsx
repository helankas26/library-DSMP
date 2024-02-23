import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import HttpResponseWithToken from "../../utils/HttpResponseWithToken.ts";
import User from "../../model/User.tsx";


const AUTH: string = '/auth';

const refreshToken = async () => {
    return await AxiosInstance.get<HttpResponseWithToken>(`${AUTH}/refresh`);
}

const signup = async (user: User) => {
    return await AxiosInstance.post<HttpResponseWithToken>(`${AUTH}/signup`, {user});
}

const login = async (username: string, password: string) => {
    return await AxiosInstance.post<HttpResponseWithToken>(`${AUTH}/login`, {username, password});
}

const logout = async () => {
    return await AxiosInstance.post<HttpResponse<null>>(`${AUTH}/logout`);
}

const forgetPassword = async (email: string) => {
    return await AxiosInstance.post<HttpResponse<string>>(`${AUTH}/forgetPassword`, {email});
}

const resetPassword = async (otp: string, password: string, confirmPassword: string) => {
    return await AxiosInstance.patch<HttpResponse<User>>(`${AUTH}/resetPassword`, {otp, password, confirmPassword});
}

export default {
    refreshToken,
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword
};