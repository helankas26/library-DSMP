import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Profile from "../../model/Profile.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";
import ProfileWithPayment from "../../model/ProfileWithPayment.ts";

const PROFILES: string = '/profiles';

const findAllProfiles = async () => {
    return await AxiosInstance.get<HttpResponse<Profile[]>>(PROFILES);
}

const findAllMembers = async () => {
    return await AxiosInstance.get<HttpResponse<Profile[]>>(`${PROFILES}/members`);
}

const findAllProfilesWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Profile[]>>(`${PROFILES}/list?page=${page}&size=${size}`);
}

const findAllProfilesBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Profile[]>>(`${PROFILES}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllMembersPaymentStatus = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Profile[]>>(`${PROFILES}/payment-status/list?page=${page}&size=${size}`);
}

const findAllMembersPaymentStatusBySearch = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Profile[]>>(`${PROFILES}/payment-status/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllPaymentArrears = async () => {
    return await AxiosInstance.get<HttpResponse<Profile[]>>(`${PROFILES}/payment-status/arrears`);
}

const createProfile = async (profile: Profile) => {
    return await AxiosInstance.post<HttpResponse<Profile>>(PROFILES, {...profile});
}

const findProfileById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/${id}`);
}

const findMemberPaymentStatusById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/${id}/payment-status`);
}

const findProfileByAuthUser = async () => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/auth`);
}

const findPaymentArrearsByAuthUser = async () => {
    return await AxiosInstance.get<HttpResponse<ProfileWithPayment>>(`${PROFILES}/payment-status/arrears`);
}

const getMemberCurrentLoansById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/${id}/transactions`);
}

const getMemberAvailableReservationsById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/${id}/reservations`);
}

const updateProfile = async (id: string, profile: Profile) => {
    return await AxiosInstance.patch<HttpResponse<Profile>>(`${PROFILES}/${id}`, {...profile});
}

const updateProfileByAuthUser = async (profile: Profile) => {
    return await AxiosInstance.patch<HttpResponse<Profile>>(`${PROFILES}/auth`, {...profile});
}

const deleteProfile = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${PROFILES}/${id}`);
}

export default {
    findAllProfiles,
    findAllMembers,
    findAllProfilesWithPagination,
    findAllProfilesBySearchWithPagination,
    findAllMembersPaymentStatus,
    findAllMembersPaymentStatusBySearch,
    findAllPaymentArrears,
    createProfile,
    findProfileById,
    findMemberPaymentStatusById,
    findProfileByAuthUser,
    findPaymentArrearsByAuthUser,
    getMemberCurrentLoansById,
    getMemberAvailableReservationsById,
    updateProfile,
    updateProfileByAuthUser,
    deleteProfile
};