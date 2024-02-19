import {RouteObject} from "react-router/dist/lib/context";
import Reservation from "../pages/Reservation.tsx";

const reservationRoutes: RouteObject[] = [
    {index: true, element: <Reservation/>},
];

export default reservationRoutes;