import {RouteObject} from "react-router/dist/lib/context";
import Book from "../pages/Book.tsx";

const bookRoutes: RouteObject[] = [
    {index: true, element: <Book/>},
];

export default bookRoutes;