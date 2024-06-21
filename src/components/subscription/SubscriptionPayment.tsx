import React, {ChangeEvent, useCallback, useEffect, useState} from "react";

import PaymentStatusLabel from "../shared/PaymentStatusLabel.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Profile from "../../model/Profile.ts";
import profileService from "../../services/api/profile.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";
import ProfileWithPayment from "../../model/ProfileWithPayment.ts";
import PaymentButton from "../shared/PaymentButton.tsx";

const SubscriberPaymentDetails = React.lazy(() => import('./SubscriberPaymentDetails.tsx'));

const SubscriptionPayment: React.FC = () => {
    const size: number = 24;
    const {showError} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);

    const loadProfiles = useCallback(async () => {
        try {
            const response = await profileService.findAllMembersPaymentStatus(page, size);

            const {profiles, from, to, totalCount, totalPages} = response.data;
            setProfiles(profiles);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchText]);


    const searchProfiles = useCallback(async () => {
        try {
            const response = await profileService.findAllMembersPaymentStatusBySearch(searchText, page, size);

            const {profiles, from, to, totalCount, totalPages} = response.data;
            setProfiles(profiles);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);
            setDelay(0);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    }, [page, searchText]);

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

    const subscriptionPaymentHandler = async (id: string) => {
        try {
            const response = await profileService.findMemberPaymentStatusById(id);
            const {profile} = response.data;
            return profile;
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshProfilesHandler = async () => {
        if (!searchText) {
            await loadProfiles();
        } else {
            await searchProfiles();
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadProfiles();
        }
    }, [loadProfiles]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchProfiles();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchProfiles]);

    return (
        <>
            <ContextHeader
                title={"Subscriptions"}
                description={"Payments"}
                elementRef={elementRef}
                searchTextChangeHandler={searchTextChangeHandler}
            />

            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && profiles.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No subscribers were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && profiles.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="pl-5 pr-2 py-3 font-semibold">Profile</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Payment Status</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Fee</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Total Amount</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Pay Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {profiles.map((profile) => (
                                <tr key={profile._id} className="border-b border-gray-200">
                                    <td className="pl-5 pr-2 py-1">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-14 h-14">
                                                <img className="w-full h-full border rounded-full"
                                                     src={profile.avatar}
                                                     alt={profile.fullName}/>
                                            </div>
                                            <div className="ml-3">
                                                <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900 whitespace-nowrap">#{profile._id}</p>
                                                <p className="text-gray-900 whitespace-nowrap">{profile.fullName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-5 pr-2 py-1">
                                        <PaymentStatusLabel paymentStatus={profile.paymentStatus}/>
                                    </td>
                                    <td className="pl-5 pr-2 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">{(profile as ProfileWithPayment).fee}</p>
                                    </td>
                                    <td className="pl-5 pr-2 py-1 max-w-xs overflow-hidden">
                                        <p className="text-gray-900 whitespace-nowrap">{(profile as ProfileWithPayment).totalAmount}</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <PaymentButton
                                            id={profile._id}
                                            onPayment={subscriptionPaymentHandler}
                                            type={"Subscription"}
                                            PaymentDetails={SubscriberPaymentDetails}
                                            onRefreshPayment={refreshProfilesHandler}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && profiles.length > 0 &&
                <PaginationBar
                    title={"subscribers"}
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

export default SubscriptionPayment;