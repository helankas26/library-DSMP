import {RouteObject} from "react-router/dist/lib/context";

import BookList from "../components/book/BookList.tsx";
import BookNew from "../components/book/BookNew.tsx";
import BookUpdate from "../components/book/BookUpdate.tsx";

const bookRoutes: RouteObject[] = [
    {index: true, element: <BookList/>},
    {path: 'new', element: <BookNew/>},
    {path: 'update', element: <BookUpdate/>}
];

export default bookRoutes;