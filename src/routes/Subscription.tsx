import {RouteObject} from "react-router/dist/lib/context";

import SubscriptionList from "../components/subscription/SubscriptionList.tsx";
import SubscriptionPay from "../components/subscription/SubscriptionPay.tsx";


const subscriptionRoutes: RouteObject[] = [
    {index: true, element: <SubscriptionList/>},
    {path: 'pay', element: <SubscriptionPay/>}
];

export default subscriptionRoutes;