import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Admission from "../../model/Admission.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";


const ADMISSIONS: string = '/admissions';

const findAllAdmissions = async () => {
    return await AxiosInstance.get<HttpResponse<Admission[]>>(ADMISSIONS);
}

const findAllAdmissionsWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Admission[]>>(`${ADMISSIONS}/list?page=${page}&size=${size}`);
}

const findAllAdmissionsBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Admission[]>>(`${ADMISSIONS}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const createAdmission = async (admission: Admission) => {
    return await AxiosInstance.post<HttpResponse<Admission>>(ADMISSIONS, {...admission});
}

const findAdmissionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Admission>>(`${ADMISSIONS}/${id}`);
}

const updateAdmission = async (id: string, admission: Admission) => {
    return await AxiosInstance.patch<HttpResponse<Admission>>(`${ADMISSIONS}/${id}`, {...admission});
}

const deleteAdmission = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${ADMISSIONS}/${id}`);
}

export default {
    findAllAdmissions,
    findAllAdmissionsWithPagination,
    findAllAdmissionsBySearchWithPagination,
    createAdmission,
    findAdmissionById,
    updateAdmission,
    deleteAdmission
};
