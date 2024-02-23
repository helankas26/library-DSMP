import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Admission from "../../model/Admission.tsx";


const ADMISSIONS: string = '/admissions';

const findAllAdmissions = async () => {
    return await AxiosInstance.get<HttpResponse<Admission>>(ADMISSIONS);
}

const createAdmission = async (admission: Admission) => {
    return await AxiosInstance.post<HttpResponse<Admission>>(ADMISSIONS, {admission});
}

const findAdmissionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Admission>>(`ADMISSIONS/${id}`);
}

const updateAdmission = async (id: string, admission: Admission) => {
    return await AxiosInstance.patch<HttpResponse<Admission>>(`ADMISSIONS/${id}`, {admission});
}

const deleteAdmission = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`ADMISSIONS/${id}`);
}

export default {
    findAllAdmissions,
    createAdmission,
    findAdmissionById,
    updateAdmission,
    deleteAdmission
};
