import {RouteObject} from "react-router/dist/lib/context";

import UserList from "../components/user/UserList.tsx";

const userRoutes: RouteObject[] = [
    {index: true, element: <UserList/>}
];

export default userRoutes;