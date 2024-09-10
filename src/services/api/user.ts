import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import User from "../../model/User.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";
import HttpResponseWithToken from "../../utils/http-response-with-token.ts";

const USERS: string = '/users';

const findAllUsers = async () => {
    return await AxiosInstance.get<HttpResponse<User[]>>(USERS);
}

const findAllUsersWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<User[]>>(`${USERS}/list?page=${page}&size=${size}`);
}

const findAllUsersBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<User[]>>(`${USERS}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findUserById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<User>>(`${USERS}/${id}`);
}

const findUserByAuthUser = async () => {
    return await AxiosInstance.get<HttpResponse<User>>(`${USERS}/auth`);
}

const updateUser = async (id: string, user: User) => {
    return await AxiosInstance.patch<HttpResponse<User>>(`${USERS}/${id}`, {user});
}

const updateUserByAuthUser = async (user: User) => {
    return await AxiosInstance.patch<HttpResponse<User>>(`${USERS}/auth`, {...user});
}

const changePasswordByAuthUser = async (user: User) => {
    return await AxiosInstance.patch<HttpResponseWithToken>(`${USERS}/auth/changePassword`, {...user});
}

const deleteUser = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${USERS}/${id}`);
}

export default {
    findAllUsers,
    findAllUsersWithPagination,
    findAllUsersBySearchWithPagination,
    findUserById,
    findUserByAuthUser,
    updateUser,
    updateUserByAuthUser,
    changePasswordByAuthUser,
    deleteUser
};