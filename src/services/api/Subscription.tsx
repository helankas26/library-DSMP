import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Subscription from "../../model/Subscription.tsx";

const SUBSCRIPTIONS: string = '/subscriptions';


const findAllSubscriptions = async () => {
    return await AxiosInstance.get<HttpResponse<Subscription>>(SUBSCRIPTIONS);
}

const createSubscription = async (subscription: Subscription) => {
    return await AxiosInstance.post<HttpResponse<Subscription>>(SUBSCRIPTIONS, {subscription});
}

const findSubscriptionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Subscription>>(`${SUBSCRIPTIONS}/${id}`);
}

const updateSubscription = async (id: string, subscription: Subscription) => {
    return await AxiosInstance.patch<HttpResponse<Subscription>>(`${SUBSCRIPTIONS}/${id}`, {subscription});
}

const deleteSubscription = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${SUBSCRIPTIONS}/${id}`);
}

export default {
    findAllSubscriptions,
    createSubscription,
    findSubscriptionById,
    updateSubscription,
    deleteSubscription
};