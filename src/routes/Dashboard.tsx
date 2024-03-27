import {RouteObject} from "react-router/dist/lib/context";

import DashboardUser from "../pages/DashboardUser.tsx";
import ProfileLayout from "../layouts/Profile.tsx";
import TransactionLayout from "../layouts/Transaction.tsx";
import BookLayout from "../layouts/Book.tsx";
import CategoryLayout from "../layouts/Category.tsx";
import AuthorLayout from "../layouts/Author.tsx";
import ReservationLayout from "../layouts/Reservation.tsx";
import SubscriptionLayout from "../layouts/Subscription.tsx";
import FineLayout from "../layouts/Fine.tsx";
import AdmissionLayout from "../layouts/Admission.tsx";
import UserLayout from "../layouts/User.tsx";
import ConfigLayout from "../layouts/Config.tsx";
import admissionRoutes from "./Admission.tsx";
import profileRoutes from "./Profile.tsx";
import transactionRoutes from "./Transaction.tsx";
import bookRoutes from "./Book.tsx";
import categoryRoutes from "./Category.tsx";
import authorRoutes from "./Author.tsx";
import reservationRoutes from "./Reservation.tsx";
import subscriptionRoutes from "./Subscription.tsx";
import fineRoutes from "./Fine.tsx";
import userRoutes from "./User.tsx";
import configRoutes from "./Config.tsx";

const dashboardRoutes: RouteObject[] = [
    {index: true, element: <DashboardUser/>},
    {
        path: 'profiles',
        element: <ProfileLayout/>,
        children: profileRoutes
    },
    {
        path: 'transactions',
        element: <TransactionLayout/>,
        children: transactionRoutes
    },
    {
        path: 'books',
        element: <BookLayout/>,
        children: bookRoutes
    },
    {
        path: 'categories',
        element: <CategoryLayout/>,
        children: categoryRoutes
    },
    {
        path: 'authors',
        element: <AuthorLayout/>,
        children: authorRoutes
    },
    {
        path: 'reservations',
        element: <ReservationLayout/>,
        children: reservationRoutes
    },
    {
        path: 'subscriptions',
        element: <SubscriptionLayout/>,
        children: subscriptionRoutes
    },
    {
        path: 'fines',
        element: <FineLayout/>,
        children: fineRoutes
    },
    {
        path: 'admissions',
        element: <AdmissionLayout/>,
        children: admissionRoutes
    },
    {
        path: 'users',
        element: <UserLayout/>,
        children: userRoutes
    },
    {
        path: 'configurations',
        element: <ConfigLayout/>,
        children: configRoutes
    }
];

export default dashboardRoutes;