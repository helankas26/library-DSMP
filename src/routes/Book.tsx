import {RouteObject} from "react-router/dist/lib/context";

import BookList from "../components/book/BookList.tsx";
import BookNew from "../components/book/BookNew.tsx";
import BookUpdate, {loader as bookDetailsLoader} from "../components/book/BookUpdate.tsx";

const bookRoutes: RouteObject[] = [
    {index: true, element: <BookList/>},
    {path: 'new', element: <BookNew/>},
    {path: ':id/edit', element: <BookUpdate/>, loader: bookDetailsLoader}
];

export default bookRoutes;