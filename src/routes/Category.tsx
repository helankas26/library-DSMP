import {RouteObject} from "react-router/dist/lib/context";

import CategoryList from "../components/category/CategoryList.tsx";

const categoryRoutes: RouteObject[] = [
    {index: true, element: <CategoryList/>}
];

export default categoryRoutes;