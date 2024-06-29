import React, {Dispatch, SetStateAction, useState} from "react";

import StatusLabel from "../shared/StatusLabel.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import reservationService from "../../services/api/reservation.ts";
import Reservation from "../../model/Reservation.ts";
import Book from "../../model/Book.ts";

const AvailableReservations: React.FC<{
    reservations: Reservation[];
    limit: number | undefined;
    books: Book[];
    setBooks: Dispatch<SetStateAction<Book[]>>;
    onRefreshReservations: () => Promise<void>
}> = (props) => {
    const {reservations, limit, books, setBooks, onRefreshReservations} = props;
    const {showError, showAlert} = useSnackbar();

    const [loadingStates, setLoadingStates] = useState<{
        [key: string]: { isAdding: boolean; isCancelling: boolean }
    }>({});

    const bookIdSet = new Set(books.map(book => book._id));

    const resetLoadingStates = (id: string) => {
        setLoadingStates((prevState) => ({
            ...prevState,
            [id]: {
                isAdding: false,
                isCancelling: false
            }
        }));
    };

    const reservationHandler = async (reservation: Reservation, status: 'BORROWED' | 'CANCELLED') => {
        setLoadingStates((prevState) => ({
            ...prevState,
            [reservation._id]: {
                isAdding: status === 'BORROWED',
                isCancelling: status === 'CANCELLED'
            }
        }));

        if (status === 'BORROWED') {
            if (bookIdSet.has(reservation.book._id)) {
                showAlert("This book is already in the list.", "warning");
                resetLoadingStates(reservation._id);
                return;
            }

            if (books.length >= (limit || books.length + 1)) {
                showAlert(`You can only select up to ${limit} books.`, "warning");
                resetLoadingStates(reservation._id);
                return;
            }
        }

        const editedReservation: Reservation = {status: status} as Reservation;

        try {
            const response = await reservationService.updateReservation(reservation._id, editedReservation);
            const {reservation: updateReservation} = response.data;

            if (updateReservation.status === 'BORROWED') {
                setBooks((prevBooks) => [...prevBooks, reservation.book]);
                showAlert("Added into the list!", "success");
            } else {
                showAlert("Canceled successfully!", "success");
            }

            await onRefreshReservations();
        } catch (error: any) {
            showError(error);
        } finally {
            resetLoadingStates(reservation._id);
        }
    };

    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl px-4 pt-2 pb-4 flex flex-col gap-2.5">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Reservations</h2>
                    <span className="text-xs">Available for borrow</span>
                </div>

                <div className="min-w-full shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead
                            className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Book</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Reserved Date</th>
                                <th className="px-5 py-3 font-semibold">Due Date</th>
                                <th className="px-5 py-3 font-semibold text-center">Options</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {reservations.map((reservation) => {
                                const reservationAt = new Date(reservation.reservationAt).toISOString().split('T')[0];
                                const dueAt = new Date(reservation.dueAt).toISOString().split('T')[0];

                                const isAdding = loadingStates[reservation._id]?.isAdding || false;
                                const isCancelling = loadingStates[reservation._id]?.isCancelling || false;

                                return (
                                    <tr key={reservation._id} className="border-b border-gray-200">
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{reservation.book.name}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <StatusLabel status={reservation.status}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{reservationAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{dueAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    className="px-4 py-2 font-semibold text-white transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 leading-tight rounded shadow disabled:cursor-not-allowed disabled:bg-gray-500"
                                                    type="button"
                                                    onClick={async () => {
                                                        await reservationHandler(reservation, "BORROWED");
                                                    }}
                                                    disabled={isAdding}
                                                    hidden={isCancelling}>
                                                    {!isAdding && 'Add'}
                                                    {isAdding && 'Adding...'}
                                                </button>

                                                <button
                                                    className="px-4 py-2 font-semibold text-white transition duration-150 bg-amber-600 hover:bg-amber-700 active:bg-amber-600 leading-tight rounded shadow disabled:cursor-not-allowed disabled:bg-gray-500"
                                                    type="button"
                                                    onClick={async () => {
                                                        await reservationHandler(reservation, "CANCELLED");
                                                    }}
                                                    disabled={isCancelling}
                                                    hidden={isAdding}>
                                                    {!isCancelling && 'Cancel'}
                                                    {isCancelling && 'Cancelling...'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AvailableReservations;