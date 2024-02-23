import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Reservation from "../../model/Reservation.tsx";

const RESERVATIONS: string = '/reservations';

const findAllReservations = async () => {
    return await AxiosInstance.get<HttpResponse<Reservation>>(RESERVATIONS);
}

const createReservation = async (reservation: Reservation) => {
    return await AxiosInstance.post<HttpResponse<Reservation>>(RESERVATIONS, {reservation});
}

const findReservationById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Reservation>>(`${RESERVATIONS}/${id}`);
}

const updateReservation = async (id: string, reservation: Reservation) => {
    return await AxiosInstance.patch<HttpResponse<Reservation>>(`${RESERVATIONS}/${id}`, {reservation});
}

const deleteReservation = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${RESERVATIONS}/${id}`);
}

export default {
    findAllReservations,
    createReservation,
    findReservationById,
    updateReservation,
    deleteReservation
};