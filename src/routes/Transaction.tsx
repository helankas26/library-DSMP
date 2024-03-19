import {RouteObject} from "react-router/dist/lib/context";

import TransactionList from "../components/transaction/TransactionList.tsx";
import LendBook from "../components/transaction/LendBook.tsx";

const transactionRoutes: RouteObject[] = [
    {index: true, element: <TransactionList/>},
    {path: 'new', element: <LendBook/>}
];

export default transactionRoutes;