import React, {useCallback, useEffect, useState} from "react";

import PaymentStatusLabel from "../../shared/PaymentStatusLabel.tsx";
import useSnackbar from "../../../hooks/use-snackbar.ts";
import useUserRole from "../../../hooks/use-user-role.ts";
import Profile from "../../../model/Profile.ts";
import profileService from "../../../services/api/profile.ts";
import GradientCircularProgress from "../../shared/GradientCircularProgress.tsx";

const SubscriptionCard: React.FC = () => {
    const {showError} = useSnackbar();
    const {userRole, isAdmin, isUser} = useUserRole();

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [payments, setPayments] = useState<{ index: number, payFor: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadArrears = useCallback(async () => {
        try {
            if (isAdmin()) {
                const response = await profileService.findAllPaymentArrears();
                const {profiles} = response.data;
                setProfiles(profiles);
            } else if (isUser()) {
                const response = await profileService.findPaymentArrearsByAuthUser();
                const {profile} = response.data;
                setPayments(profile.payments);
            }
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    const getMinWidthClass = () => {
        if (isAdmin()) return 'min-w-[460px]';
        if (isUser()) return 'min-w-[340px]';
        return '';
    };

    useEffect(() => {
        loadArrears();
    }, [loadArrears]);

    return (
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="mb-4 border-b border-gray-200">
                <p className="font-medium">Subscription Arrears</p>
            </div>

            {isLoading &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <GradientCircularProgress/>
                </div>
            }

            {!isLoading && (profiles.length === 0 && payments.length === 0) &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <p className="text-lg font-medium bg-amber-300 text-white w-4/5 px-3 py-2 rounded-sm border-l-8 border-l-amber-500">
                        No Arrears
                    </p>
                </div>
            }

            {!isLoading && (profiles.length > 0 || payments.length > 0) &&
                <div className="overflow-x-auto h-[300px] h-">
                    <table className={`w-full ${getMinWidthClass()}`}>
                        <thead>
                            <tr className="text-[12px] uppercase tracking-wide text-gray-400 bg-gray-50 text-left">
                                {isAdmin() &&
                                    <th className="font-medium py-2 px-4 rounded-tl-md rounded-bl-md">Profile</th>
                                }
                                <th className="font-medium py-2 px-4 rounded-tr-md rounded-br-md">Arrears Month</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isAdmin() && profiles.map((profile) => (
                                <tr key={profile._id} className="border-b border-b-gray-100">
                                    <td className="py-2 px-4">
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-full object-cover block"
                                                 src={profile.avatar}
                                                 alt={profile.fullName}/>
                                            <p className="text-gray-600 text-sm font-medium ml-2 truncate">
                                                {profile.fullName}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <p className="text-[13px] font-medium text-gray-500">
                                            <PaymentStatusLabel paymentStatus={profile.paymentStatus}/>
                                        </p>
                                    </td>
                                </tr>
                            ))}

                            {isUser() && payments.map((payment) => (
                                <tr key={payment.index} className="border-b border-b-gray-100">
                                    <td className="py-2 px-4">
                                        <p className="font-normal text-red-500">{payment.payFor}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default SubscriptionCard;