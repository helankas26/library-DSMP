import React from "react";
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SnackbarService from "./components/shared/SnackbarService.tsx";
import useSnackbar from "./hooks/use-snackbar.ts";
import HomeLayout from "./layouts/Home.tsx";
import homeRoutes from "./routes/Home.tsx";
import NotFoundError from "./pages/NotFoundError.tsx";
import DashboardLayout from "./layouts/Dashboard.tsx";
import dashboardRoutes from "./routes/Dashboard.tsx";
import useAxiosInstance from "./hooks/use-axios-instance.ts";
import useUserRole from "./hooks/use-user-role.ts";
import useProfile from "./hooks/use-profile.ts";

const App: React.FC = () => {
    useAxiosInstance();
    useUserRole();
    useProfile();
    const {snackbarState} = useSnackbar(true);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout/>,
            errorElement: <NotFoundError/>,
            children: homeRoutes
        },
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: dashboardRoutes
        }
    ]);

    return (
        <>
            {snackbarState && <SnackbarService options={snackbarState}/>}
            <RouterProvider router={router}/>
        </>
    )
}

export default App
