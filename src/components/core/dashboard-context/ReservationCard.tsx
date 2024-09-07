import React, {useCallback, useEffect, useState} from "react";

import useSnackbar from "../../../hooks/use-snackbar.ts";
import useUserRole from "../../../hooks/use-user-role.ts";
import Reservation from "../../../model/Reservation.ts";
import reservationService from "../../../services/api/reservation.ts";
import GradientCircularProgress from "../../shared/GradientCircularProgress.tsx";

const ReservationCard: React.FC = () => {
    const {showError} = useSnackbar();
    const {userRole, isAdmin, isUser} = useUserRole();

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadReservations = useCallback(async () => {
        try {
            const response = await reservationService.findAllReserved();

            const {reservations} = response.data;
            setReservations(reservations);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    const getMinWidthClass = () => {
        if (isAdmin()) return 'min-w-[660px]';
        if (isUser()) return 'min-w-[440px]';
        return '';
    };

    useEffect(() => {
        loadReservations();
    }, [loadReservations]);

    return (
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="mb-4 border-b border-gray-200">
                <p className="font-medium">Reservations</p>
            </div>

            {isLoading &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <GradientCircularProgress/>
                </div>
            }

            {!isLoading && reservations.length === 0 &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <p className="text-lg font-medium bg-amber-300 text-white w-4/5 px-3 py-2 rounded-sm border-l-8 border-l-amber-500">
                        No Reservations
                    </p>
                </div>
            }

            {!isLoading && reservations.length > 0 &&
                <div className="overflow-x-auto h-[300px]">
                    <table className={`w-full ${getMinWidthClass()}`}>
                        <thead>
                            <tr className="text-[12px] uppercase tracking-wide text-gray-400 bg-gray-50 text-left">
                                {isAdmin() &&
                                    <th className="font-medium py-2 px-4 rounded-tl-md rounded-bl-md">Profile</th>
                                }
                                <th className="font-medium py-2 px-4">Book</th>
                                <th className="font-medium py-2 px-4 rounded-tr-md rounded-br-md">Due Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map((reservation) => {
                                const dueAt = new Date(reservation.dueAt).toISOString().split('T')[0];

                                return (
                                    <tr key={reservation._id} className="border-b border-b-gray-100">
                                        {isAdmin() &&
                                            <td className="py-2 px-4">
                                                <div className="flex items-center">
                                                    <img className="w-8 h-8 rounded-full object-cover block"
                                                         src={reservation.member.avatar}
                                                         alt={reservation.member.fullName}/>
                                                    <p className="text-gray-600 text-sm font-medium ml-2 truncate">
                                                        {reservation.member.fullName}
                                                    </p>
                                                </div>
                                            </td>
                                        }
                                        <td className="py-2 px-4">
                                            <p className="text-[13px] font-medium text-gray-500">{reservation.book.name}</p>
                                        </td>
                                        <td className="py-2 px-4">
                                            <p className="text-[12px] font-medium text-gray-500 leading-none">
                                                {dueAt}
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default ReservationCard;