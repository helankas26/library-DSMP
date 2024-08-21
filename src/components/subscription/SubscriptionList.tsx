import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Subscription from "../../model/Subscription.ts";
import subscriptionService from "../../services/api/subscription.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";
import UpdateSubscriptionForm from "./UpdateSubscriptionForm.tsx";
import useUserRole from "../../hooks/use-user-role.ts";

const PaymentDetails = React.lazy(() => import('./PaymentDetails.tsx'));

const SubscriptionList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {userRole, isAdmin, isUser} = useUserRole();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateSubscription, setUpdateSubscription] = useState<Subscription>();

    const loadSubscriptions = useCallback(async () => {
        try {
            let response;

            if (isAdmin()) {
                response = await subscriptionService.findAllSubscriptionsWithPagination(page, size);
            } else if (isUser()) {
                response = await subscriptionService.findAllSubscriptionsWithPaginationByAuthUser(page, size);
            }

            if (response) {
                const {subscriptions, from, to, totalCount, totalPages} = response.data;
                setSubscriptions(subscriptions);
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


    const searchSubscriptions = useCallback(async () => {
        try {
            let response;

            if (isAdmin()) {
                response = await subscriptionService.findAllSubscriptionsBySearchWithPagination(searchText, page, size);
            } else if (isUser()) {
                response = await subscriptionService.findAllSubscriptionsBySearchWithPaginationByAuthUser(searchText, page, size);
            }

            if (response) {
                const {subscriptions, from, to, totalCount, totalPages} = response.data;
                setSubscriptions(subscriptions);
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

    const subscriptionViewHandler = async (id: string) => {
        try {
            let response;

            if (isAdmin()) {
                response = await subscriptionService.findSubscriptionById(id);
            } else if (isUser()) {
                response = await subscriptionService.findSubscriptionByIdWithByAuthUser(id);
            }

            if (response) {
                const {subscription} = response.data;
                return subscription;
            }

            return null;
        } catch (error: any) {
            showError(error);
        }
    };

    const subscriptionUpdateHandler = async (id: string) => {
        try {
            const response = await subscriptionService.findSubscriptionById(id);
            const {subscription} = response.data;
            setUpdateSubscription(subscription);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshSubscriptionsHandler = async () => {
        if (!searchText) {
            await loadSubscriptions();
        } else {
            await searchSubscriptions();
        }
    };

    const subscriptionDeleteHandler = async (subscription: Subscription, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (subscription._id === updateSubscription?._id) {
                showError({message: "Can not delete. This subscription is to update!"});
                setOpen(false);
                return;
            }

            await subscriptionService.deleteSubscription(subscription._id);
            showAlert("Payment deleted successfully!", "success");
            await refreshSubscriptionsHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadSubscriptions();
        }
    }, [loadSubscriptions]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchSubscriptions();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchSubscriptions]);


    return (
        <>
            <div className="flex flex-col gap-8">
                {toggleUpdate && updateSubscription &&
                    <UpdateSubscriptionForm
                        key={updateSubscription._id}
                        subscription={updateSubscription}
                        setUpdateSubscription={setUpdateSubscription}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshSubscriptions={refreshSubscriptionsHandler}
                    />
                }

                <ContextHeader
                    title={"Subscriptions"}
                    description={"All Subscriptions"}
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

                {!isLoading && subscriptions.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No subscriptions were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && subscriptions.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Member</th>}
                                <th className="px-5 py-3 font-semibold">Fee</th>
                                <th className="px-5 py-3 font-semibold">Paid For</th>
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Librarian</th>}
                                <th className="px-5 py-3 font-semibold">Paid Date</th>
                                <th className="px-5 py-3 font-semibold">Update Date</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Update Option</th>}
                                {isAdmin() && <th className="px-5 py-3 font-semibold">Delete Option</th>}
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {subscriptions.map((subscription) => {
                                const paidAt = new Date(subscription.paidAt).toISOString().split('T')[0];
                                const updateAt = subscription.updateAt ? new Date(subscription.updateAt).toISOString().split('T')[0] : '-';

                                return (
                                    <tr key={subscription._id} className="border-b border-gray-200">
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <p className="text-gray-900 whitespace-nowrap">{subscription.member?.fullName}</p>
                                            </td>
                                        }

                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{subscription.fee.toFixed(2)}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{subscription.paidFor}</p>
                                        </td>
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <p className="text-gray-900 whitespace-nowrap">{subscription.librarian?.fullName}</p>
                                            </td>
                                        }
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{paidAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{updateAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <ViewButton id={subscription._id} onView={subscriptionViewHandler} type={"Subscription"} DetailsView={PaymentDetails}/>
                                        </td>
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <UpdateButton id={subscription._id}
                                                              onUpdate={subscriptionUpdateHandler}/>
                                            </td>
                                        }
                                        {isAdmin() &&
                                            <td className="px-5 py-2">
                                                <DeleteButton type={"subscription"} record={subscription}
                                                              onDelete={subscriptionDeleteHandler}/>
                                            </td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && subscriptions.length > 0 &&
                <PaginationBar
                    title={"subscriptions"}
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

export default SubscriptionList;