import {RouteObject} from "react-router/dist/lib/context";
import {Navigate} from "react-router-dom";

import DashboardUser from "../pages/DashboardUser.tsx";
import ProfileLayout from "../layouts/Profile.tsx";
import profileRoutes from "./Profile.tsx";
import TransactionLayout from "../layouts/Transaction.tsx";
import transactionRoutes from "./Transaction.tsx";
import BookLayout from "../layouts/Book.tsx";
import bookRoutes from "./Book.tsx";
import CategoryLayout from "../layouts/Category.tsx";
import categoryRoutes from "./Category.tsx";
import AuthorLayout from "../layouts/Author.tsx";
import authorRoutes from "./Author.tsx";
import ReservationLayout from "../layouts/Reservation.tsx";
import reservationRoutes from "./Reservation.tsx";
import SubscriptionLayout from "../layouts/Subscription.tsx";
import subscriptionRoutes from "./Subscription.tsx";
import FineLayout from "../layouts/Fine.tsx";
import fineRoutes from "./Fine.tsx";
import AdmissionLayout from "../layouts/Admission.tsx";
import admissionRoutes from "./Admission.tsx";
import UserLayout from "../layouts/User.tsx";
import userRoutes from "./User.tsx";
import ConfigLayout from "../layouts/Config.tsx";
import configRoutes from "./Config.tsx";
import AccountSettings from "../pages/security/AccountSettings.tsx";

const consoleRoutes: RouteObject[] = [
    {index: true, element: <Navigate to="home" replace={true}/>},
    {path: 'home', element: <DashboardUser/>},
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
    },
    {
        path: 'account/settings',
        element: <AccountSettings/>
    }
];

export default consoleRoutes;