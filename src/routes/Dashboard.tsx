import {RouteObject} from "react-router/dist/lib/context";
import DashboardLibrarian from "../pages/DashboardLibrarian.tsx";
import admissionRoutes from "./Admission.tsx";
import profileRoutes from "./Profile.tsx";
import transactionRoutes from "./Transaction.tsx";
import bookRoutes from "./Book.tsx";
import reservationRoutes from "./Reservation.tsx";
import subscriptionRoutes from "./Subscription.tsx";
import fineRoutes from "./Fine.tsx";
import userRoutes from "./User.tsx";
import configRoutes from "./Config.tsx";

const dashboardRoutes: RouteObject[] = [
    {index: true, element: <DashboardLibrarian/>},
    {
        path: 'profiles',
        children: profileRoutes
    },
    {
        path: 'transactions',
        children: transactionRoutes
    },
    {
        path: 'books',
        children: bookRoutes
    },
    {
        path: 'reservations',
        children: reservationRoutes
    },
    {
        path: 'subscriptions',
        children: subscriptionRoutes
    },
    {
        path: 'fines',
        children: fineRoutes
    },
    {
        path: 'admissions',
        children: admissionRoutes
    },
    {
        path: 'users',
        children: userRoutes
    },
    {
        path: 'configurations',
        children: configRoutes
    },
];

export default dashboardRoutes;