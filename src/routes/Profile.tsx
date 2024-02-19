import {RouteObject} from "react-router/dist/lib/context";
import Profile from "../pages/Profile.tsx";

const profileRoutes: RouteObject[] = [
    {index: true, element: <Profile/>},
];

export default profileRoutes;