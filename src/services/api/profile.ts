import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Profile from "../../model/Profile.ts";

const PROFILES: string = '/profiles';


const findAllProfiles = async () => {
    return await AxiosInstance.get<HttpResponse<Profile>>(PROFILES);
}

const createProfile = async (profile: Profile) => {
    return await AxiosInstance.post<HttpResponse<Profile>>(PROFILES, {profile});
}

const findProfileById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/${id}`);

}

const findProfileByAuthUser = async () => {
    return await AxiosInstance.get<HttpResponse<Profile>>(`${PROFILES}/auth`);

}

const updateProfile = async (id: string, profile: Profile) => {
    return await AxiosInstance.patch<HttpResponse<Profile>>(`${PROFILES}/${id}`, {profile});

}

const deleteProfile = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${PROFILES}/${id}`);
}

export default {
    findAllProfiles,
    createProfile,
    findProfileById,
    findProfileByAuthUser,
    updateProfile,
    deleteProfile
};