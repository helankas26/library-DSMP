import {RouteObject} from "react-router/dist/lib/context";

import ReservationList from "../components/reservation/ReservationList.tsx";

const reservationRoutes: RouteObject[] = [
    {index: true, element: <ReservationList/>}
];

export default reservationRoutes;