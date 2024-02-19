import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomeLayout from "./layouts/Home.tsx";
import homeRoutes from "./routes/Home.tsx";
import NotFoundError from "./pages/NotFoundError.tsx";
import DashboardLayout from "./layouts/Dashboard.tsx";
import dashboardRoutes from "./routes/Dashboard.tsx";

function App() {

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
            <RouterProvider router={router}/>
        </>
    )
}

export default App
