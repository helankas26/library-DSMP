import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import Reservation from "../../model/Reservation.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import reservationService from "../../services/api/reservation.ts";
import ReservationStatus from "../../enum/ReservationStatus.ts";

const ReservationUpdateForm: React.FC<{
    reservation: Reservation;
    setUpdateReservation: Dispatch<SetStateAction<Reservation | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshReservations: () => Promise<void>
}> = (props) => {
    const {reservation, setUpdateReservation, setToggleUpdate, onRefreshReservations} = props;
    const {showError, showAlert} = useSnackbar();

    const [status, setStatus] = useState<ReservationStatus.Reserved | ReservationStatus.Cancelled | ReservationStatus.Borrowed | ReservationStatus.Expired>(reservation.status);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateReservationHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedReservation: Reservation = {
            status: status
        } as Reservation;

        try {
            await reservationService.updateReservation(reservation._id, editedReservation);
            showAlert("Reservation updated successfully!", "success");
            await onRefreshReservations();
            setToggleUpdate(false);
            setUpdateReservation(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateReservation(undefined);
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
                    <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 w-14 h-14">
                            <img className="w-full h-full border rounded-full"
                                 src={reservation.member?.avatar}
                                 alt={reservation.member?.fullName}/>
                        </div>
                        <div className="ml-3">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{reservation.member?._id}</p>
                            <p className="text-gray-900">{reservation.member?.fullName}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex justify-center">
                            <div className="flex-shrink-0 w-14 h-16">
                                <img className="w-full h-full border rounded-md"
                                     src={reservation.book?.cover}
                                     alt={reservation.book?.name}/>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{reservation.book?._id}</p>
                            <p className="text-gray-900">{reservation.book?.name}</p>
                        </div>
                    </div>
                </div>

                <Form className="flex flex-col md:flex-row md:items-end gap-5 sm:gap-10" onSubmit={updateReservationHandler}>
                    <div className="w-full">
                        <label htmlFor="status"
                               className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
                        <div className="flex justify-center gap-0 sm:gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                            <div className="w-full">
                                <input
                                    className="peer hidden"
                                    id="reserved"
                                    type="radio"
                                    value={ReservationStatus.Reserved}
                                    name="status"
                                    onChange={() => {
                                        setStatus(ReservationStatus.Reserved);
                                    }}
                                    checked={status === ReservationStatus.Reserved}/>
                                <label htmlFor="reserved"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-blue-600 peer-checked:font-semibold peer-checked:text-white">{ReservationStatus.Reserved}</label>
                            </div>
                            <div className="w-full">
                                <input
                                    className="peer hidden"
                                    id="borrowed"
                                    type="radio"
                                    value={ReservationStatus.Borrowed}
                                    name="status"
                                    onChange={() => {
                                        setStatus(ReservationStatus.Borrowed);
                                    }}
                                    checked={status === ReservationStatus.Borrowed}/>
                                <label htmlFor="borrowed"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">{ReservationStatus.Borrowed}</label>
                            </div>
                            <div className="w-full">
                                <input
                                    className="peer hidden"
                                    id="cancelled"
                                    type="radio"
                                    value={ReservationStatus.Cancelled}
                                    name="status"
                                    onChange={() => {
                                        setStatus(ReservationStatus.Cancelled);
                                    }}
                                    checked={status === ReservationStatus.Cancelled}/>
                                <label htmlFor="cancelled"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">{ReservationStatus.Cancelled}</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                        <CancelButton isUpdating={isUpdating} onCancel={cancelUpdateHandler}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ReservationUpdateForm;