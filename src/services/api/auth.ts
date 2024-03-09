import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import HttpResponseWithToken from "../../utils/http-response-with-token.ts";
import User from "../../model/User.ts";


const AUTH: string = '/auth';

const refreshToken = async () => {
    return await AxiosInstance.get<HttpResponseWithToken>(`${AUTH}/refresh`);
}

const checkRegistrationValid = async (regNo: string) => {
    return await AxiosInstance.post<HttpResponse<boolean>>(`${AUTH}/checkRegNoValid`, {regNo});
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

const checkOtpValid = async (otp: string) => {
    return await AxiosInstance.post<HttpResponse<boolean>>(`${AUTH}/checkOtpValid`, {otp});
}

const resetPassword = async (otp: string, password: string, confirmPassword: string) => {
    return await AxiosInstance.patch<HttpResponse<User>>(`${AUTH}/resetPassword`, {otp, password, confirmPassword});
}

export default {
    refreshToken,
    checkRegistrationValid,
    signup,
    login,
    logout,
    forgetPassword,
    checkOtpValid,
    resetPassword
};