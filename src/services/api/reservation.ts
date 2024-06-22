import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Reservation from "../../model/Reservation.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";

const RESERVATIONS: string = '/reservations';

const findAllReservations = async () => {
    return await AxiosInstance.get<HttpResponse<Reservation[]>>(RESERVATIONS);
}

const findAllReservationsWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Reservation[]>>(`${RESERVATIONS}/list?page=${page}&size=${size}`);
}

const findAllReservationsBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Reservation[]>>(`${RESERVATIONS}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllReservationsWithPaginationByAuthUser = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Reservation[]>>(`${RESERVATIONS}/auth/list?page=${page}&size=${size}`);
}

const findAllReservationsBySearchWithPaginationByAuthUser = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Reservation[]>>(`${RESERVATIONS}/auth/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const createReservation = async (reservation: Reservation) => {
    return await AxiosInstance.post<HttpResponse<Reservation>>(RESERVATIONS, {...reservation});
}

const findReservationById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Reservation>>(`${RESERVATIONS}/${id}`);
}

const findReservationByIdWithByAuthUser = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Reservation>>(`${RESERVATIONS}/${id}/auth`);
}

const updateReservation = async (id: string, reservation: Reservation) => {
    return await AxiosInstance.patch<HttpResponse<Reservation>>(`${RESERVATIONS}/${id}`, {...reservation});
}

const deleteReservation = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${RESERVATIONS}/${id}`);
}

export default {
    findAllReservations,
    findAllReservationsWithPagination,
    findAllReservationsBySearchWithPagination,
    findAllReservationsWithPaginationByAuthUser,
    findAllReservationsBySearchWithPaginationByAuthUser,
    createReservation,
    findReservationById,
    findReservationByIdWithByAuthUser,
    updateReservation,
    deleteReservation
};