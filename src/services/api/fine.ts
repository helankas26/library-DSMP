import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Fine from "../../model/Fine.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";

const FINES: string = '/fines';

const findAllFines = async () => {
    return await AxiosInstance.get<HttpResponse<Fine[]>>(FINES);
}

const findAllFinesWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Fine[]>>(`${FINES}/list?page=${page}&size=${size}`);
}

const findAllFinesBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Fine[]>>(`${FINES}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllFinesWithPaginationByAuthUser = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Fine[]>>(`${FINES}/auth/list?page=${page}&size=${size}`);
}

const findAllFinesBySearchWithPaginationByAuthUser = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Fine[]>>(`${FINES}/auth/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const getTodayFinesCollection = async () => {
    return await AxiosInstance.get<HttpResponse<number>>(`${FINES}/today-collection`);
}

const createFine = async (fines: Fine) => {
    return await AxiosInstance.post<HttpResponse<Fine>>(FINES, {...fines});
}

const findFineById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Fine>>(`${FINES}/${id}`);
}

const findFineByIdWithByAuthUser = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Fine>>(`${FINES}/${id}/auth`);
}

const updateFine = async (id: string, fine: Fine) => {
    return await AxiosInstance.patch<HttpResponse<Fine>>(`${FINES}/${id}`, {...fine});
}

const deleteFine = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${FINES}/${id}`);

}

export default {
    findAllFines,
    findAllFinesWithPagination,
    findAllFinesBySearchWithPagination,
    findAllFinesWithPaginationByAuthUser,
    findAllFinesBySearchWithPaginationByAuthUser,
    getTodayFinesCollection,
    createFine,
    findFineById,
    findFineByIdWithByAuthUser,
    updateFine,
    deleteFine
};