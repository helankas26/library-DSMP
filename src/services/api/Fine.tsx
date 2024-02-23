import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Fine from "../../model/Fine.tsx";


const FINES: string = '/fines';

const findAllFines = async () => {
    return await AxiosInstance.get<HttpResponse<Fine>>(FINES);
}

const createFine = async (fine: Fine) => {
    return await AxiosInstance.post<HttpResponse<Fine>>(FINES, {fine});
}

const findFineById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Fine>>(`${FINES}/${id}`);
}

const updateFine = async (id: string, fine: Fine) => {
    return await AxiosInstance.patch<HttpResponse<Fine>>(`${FINES}/${id}`, {fine});
}

const deleteFine = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${FINES}/${id}`);

}

export default {
    findAllFines,
    createFine,
    findFineById,
    updateFine,
    deleteFine
};