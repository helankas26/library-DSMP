import {RouteObject} from "react-router/dist/lib/context";
import {Navigate} from "react-router-dom";

import Verification from "../pages/Verification.tsx";
import consoleRoutes from "./Console.tsx";
import ConsoleLayout from "../layouts/Console.tsx";

const dashboardRoutes: RouteObject[] = [
    {index: true, element: <Navigate to="verification" replace={true}/>},
    {path: 'verification', element: <Verification/>},
    {
        path: 'console',
        element: <ConsoleLayout/>,
        children: consoleRoutes
    }
];

export default dashboardRoutes;