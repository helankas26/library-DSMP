import {RouteObject} from "react-router/dist/lib/context";
import Transaction from "../pages/Transaction.tsx";

const transactionRoutes: RouteObject[] = [
    {index: true, element: <Transaction/>},
];

export default transactionRoutes;