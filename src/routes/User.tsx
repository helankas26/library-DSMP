import {RouteObject} from "react-router/dist/lib/context";
import User from "../pages/User.tsx";

const userRoutes: RouteObject[] = [
    {index: true, element: <User/>},
];

export default userRoutes;