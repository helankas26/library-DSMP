import {RouteObject} from "react-router/dist/lib/context";

import Home from "../pages/Home.tsx";
import authRoutes from "./Auth.tsx";

const homeRoutes: RouteObject[] = [
    {index: true, element: <Home/>},
    {
        path: 'auth',
        children: authRoutes
    }
];

export default homeRoutes;