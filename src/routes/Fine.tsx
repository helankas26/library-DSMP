import {RouteObject} from "react-router/dist/lib/context";

import FineList from "../components/fine/FineList.tsx";

const fineRoutes: RouteObject[] = [
    {index: true, element: <FineList/>}
];

export default fineRoutes;