import {RouteObject} from "react-router/dist/lib/context";

import SubscriptionList from "../components/subscription/SubscriptionList.tsx";
import SubscriptionPayment from "../components/subscription/SubscriptionPayment.tsx";

const subscriptionRoutes: RouteObject[] = [
    {index: true, element: <SubscriptionList/>},
    {path: 'pay', element: <SubscriptionPayment/>}
];

export default subscriptionRoutes;