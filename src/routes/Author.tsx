import {RouteObject} from "react-router/dist/lib/context";

import AuthorList from "../components/author/AuthorList.tsx";

const authorRoutes: RouteObject[] = [
    {index: true, element: <AuthorList/>}
];

export default authorRoutes;