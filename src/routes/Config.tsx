import {RouteObject} from "react-router/dist/lib/context";

import ConfigView from "../components/config/ConfigView.tsx";

const configRoutes: RouteObject[] = [
    {index: true, element: <ConfigView/>}
];

export default configRoutes;