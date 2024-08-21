import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import StatusLabel from "../shared/StatusLabel.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import ReservationUpdateForm from "./ReservationUpdateForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Reservation from "../../model/Reservation.ts";
import reservationService from "../../services/api/reservation.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";
import useUserRole from "../../hooks/use-user-role.ts";
import CancelReservationButton from "../shared/CancelReservationButton.tsx";

const ReservationList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {userRole, isAdmin, isUser} = useUserRole();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateReservation, setUpdateReservation] = useState<Reservation>();

    const loadReservations = useCallback(async () => {
        try {
            let response;

            if (isAdmin()) {
                response = await reservationService.findAllReservationsWithPagination(page, size);
            } else if (isUser()) {
                response = await reservationService.findAllReservationsWithPaginationByAuthUser(page, size);
            }

            if (response) {
                const {reservations, from, to, totalCount, totalPages} = response.data;
                setReservations(reservations);
                setFrom(from);
                setTo(to);
                setTotalCount(totalCount);
                setTotalPages(totalPages);

                scrollToTop();
            }
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchText, userRole]);


    const searchReservations = useCallback(async () => {
        try {
            let response;

            if (isAdmin()) {
                response = await reservationService.findAllReservationsBySearchWithPagination(searchText, page, size);
            } else if (isUser()) {
                response = await reservationService.findAllReservationsBySearchWithPaginationByAuthUser(searchText, page, size);
            }

            if (response) {
                const {reservations, from, to, totalCount, totalPages} = response.data;
                setReservations(reservations);
                setFrom(from);
                setTo(to);
                setTotalCount(totalCount);
                setTotalPages(totalPages);
                setDelay(0);

                scrollToTop();
            }
        } catch (error: any) {
            showError(error);
        }
    }, [page, searchText, userRole]);

    const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setPage(1);
        setDelay(750);
    };

    const nextPageHandler = async () => {
        if (page < totalPages) {
            setPage((prevState) => prevState + 1);
        }
    };

    const prevPageHandler = async () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
        }
    };

    const reservationUpdateHandler = async (id: string) => {
        try {
            const response = await reservationService.findReservationById(id);
            const {reservation} = response.data;
            setUpdateReservation(reservation);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshReservationsHandler = async () => {
        if (!searchText) {
            await loadReservations();
        } else {
            await searchReservations();
        }
    };

    const reservationCancelHandler = async (id: string, setOpen: Dispatch<SetStateAction<boolean>>) => {
        const editedReservation: Reservation = {
            status: 'CANCELLED'
        } as Reservation;

        try {
            await reservationService.updateReservationByAuthUser(id, editedReservation);
            showAlert("Transaction cancelled successfully!", "success");
            await refreshReservationsHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadReservations();
        }
    }, [loadReservations]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchReservations();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchReservations]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {toggleUpdate && updateReservation && isAdmin() &&
                    <ReservationUpdateForm
                        key={updateReservation._id}
                        reservation={updateReservation}
                        setUpdateReservation={setUpdateReservation}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshReservations={refreshReservationsHandler}
                    />
                }

                <ContextHeader
                    title={"Reservations"}
                    description={"All Reservations"}
                    elementRef={elementRef}
                    searchTextChangeHandler={searchTextChangeHandler}
                />
            </div>

            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && reservations.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No reservations were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && reservations.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Member</th>}
                                <th className="px-5 py-3 font-semibold">Book</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Reserved Date</th>
                                <th className="px-5 py-3 font-semibold">Due Date</th>
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Update Option</th>}
                                {isUser() && reservations.some(reservation => reservation.status === 'RESERVED') && <th className="px-5 py-3 font-semibold">Cancel Option</th>}
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {reservations.map((reservation) => {
                                const reservationAt = new Date(reservation.reservationAt).toISOString().split('T')[0];
                                const dueAt = new Date(reservation.dueAt).toISOString().split('T')[0];

                                return (
                                    <tr key={reservation._id}  className="border-b border-gray-200">
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <p className="text-gray-900 whitespace-nowrap">{reservation.member?.fullName}</p>
                                            </td>
                                        }
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{reservation.book?.name}</p>
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
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <UpdateButton id={reservation._id} onUpdate={reservationUpdateHandler}/>
                                            </td>
                                        }
                                        {isUser() && reservation.status === 'RESERVED' &&
                                            <td className="px-5 py-2">
                                                <CancelReservationButton id={reservation._id} onCancel={reservationCancelHandler}/>
                                            </td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && reservations.length > 0 &&
                <PaginationBar
                    title={"reservations"}
                    style={'mt-2.5'}
                    page={page}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    from={from}
                    to={to}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            }
        </>
    );
}

export default ReservationList;