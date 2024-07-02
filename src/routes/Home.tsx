import {RouteObject} from "react-router/dist/lib/context";

import Home from "../pages/Home.tsx";
import AuthLayout from "../layouts/Auth.tsx";
import authRoutes from "./Auth.tsx";
import BookDetails, {loader as bookDetailsLoader} from "../pages/BookDetails.tsx";

const homeRoutes: RouteObject[] = [
    {index: true, element: <Home/>},
    {
        path: 'auth',
        element: <AuthLayout/>,
        children: authRoutes
    },
    {path: 'books/:id', element: <BookDetails/>, loader: bookDetailsLoader}
];

export default homeRoutes;