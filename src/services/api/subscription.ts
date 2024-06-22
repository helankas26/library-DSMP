import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Subscription from "../../model/Subscription.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";

const SUBSCRIPTIONS: string = '/subscriptions';

const findAllSubscriptions = async () => {
    return await AxiosInstance.get<HttpResponse<Subscription[]>>(SUBSCRIPTIONS);
}

const findAllSubscriptionsWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Subscription[]>>(`${SUBSCRIPTIONS}/list?page=${page}&size=${size}`);
}

const findAllSubscriptionsBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Subscription[]>>(`${SUBSCRIPTIONS}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllSubscriptionsWithPaginationByAuthUser = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Subscription[]>>(`${SUBSCRIPTIONS}/auth/list?page=${page}&size=${size}`);
}

const findAllSubscriptionsBySearchWithPaginationByAuthUser = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Subscription[]>>(`${SUBSCRIPTIONS}/auth/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const createSubscription = async (subscription: Subscription) => {
    return await AxiosInstance.post<HttpResponse<Subscription>>(SUBSCRIPTIONS, {...subscription});
}

const findSubscriptionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Subscription>>(`${SUBSCRIPTIONS}/${id}`);
}

const findSubscriptionByIdWithByAuthUser = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Subscription>>(`${SUBSCRIPTIONS}/${id}/auth`);
}

const updateSubscription = async (id: string, subscription: Subscription) => {
    return await AxiosInstance.patch<HttpResponse<Subscription>>(`${SUBSCRIPTIONS}/${id}`, {...subscription});
}

const deleteSubscription = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${SUBSCRIPTIONS}/${id}`);
}

export default {
    findAllSubscriptions,
    findAllSubscriptionsWithPagination,
    findAllSubscriptionsBySearchWithPagination,
    findAllSubscriptionsWithPaginationByAuthUser,
    findAllSubscriptionsBySearchWithPaginationByAuthUser,
    createSubscription,
    findSubscriptionById,
    findSubscriptionByIdWithByAuthUser,
    updateSubscription,
    deleteSubscription
};