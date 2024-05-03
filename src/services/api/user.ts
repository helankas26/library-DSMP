import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import User from "../../model/User.ts";

const USERS: string = '/users';

const findAllUsers = async () => {
    return await AxiosInstance.get<HttpResponse<User[]>>(USERS);
}

const findUserById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<User>>(`${USERS}/${id}`);
}

const updateUser = async (user: User) => {
    return await AxiosInstance.patch<HttpResponse<User>>(USERS, {user});
}

const changePassword = async (user: User) => {
    return await AxiosInstance.patch<HttpResponse<User>>(`${USERS}/changePassword`, {user});
}

const deleteUser = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${USERS}/${id}`);
}

export default {
    findAllUsers,
    findUserById,
    updateUser,
    changePassword,
    deleteUser
};