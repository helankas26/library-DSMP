import {RouteObject} from "react-router/dist/lib/context";

import ProfileList from "../components/profile/ProfileList.tsx";
import ProfileNew from "../components/profile/ProfileNew.tsx";
import ProfileUpdate from "../components/profile/ProfileUpdate.tsx";

const profileRoutes: RouteObject[] = [
    {index: true, element: <ProfileList/>},
    {path: 'new', element: <ProfileNew/>},
    {path: 'update', element: <ProfileUpdate/>}
];

export default profileRoutes;