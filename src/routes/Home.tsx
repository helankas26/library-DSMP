import {RouteObject} from "react-router/dist/lib/context";

import Home from "../pages/Home.tsx";
import AuthLayout from "../layouts/Auth.tsx";
import authRoutes from "./Auth.tsx";

const homeRoutes: RouteObject[] = [
    {index: true, element: <Home/>},
    {
        path: 'auth',
        element: <AuthLayout/>,
        children: authRoutes
    }
];

export default homeRoutes;