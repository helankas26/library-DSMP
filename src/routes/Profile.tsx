import {RouteObject} from "react-router/dist/lib/context";

import ProfileList from "../components/profile/ProfileList.tsx";
import ProfileNew from "../components/profile/ProfileNew.tsx";
import ProfileUpdate, {loader as profileDetailsLoader} from "../components/profile/ProfileUpdate.tsx";

const profileRoutes: RouteObject[] = [
    {index: true, element: <ProfileList/>},
    {path: 'new', element: <ProfileNew/>},
    {path: ':id/edit', element: <ProfileUpdate/>, loader: profileDetailsLoader}
];

export default profileRoutes;