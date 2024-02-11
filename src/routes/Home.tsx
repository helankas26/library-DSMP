import {RouteObject} from "react-router/dist/lib/context";
import Home from "../pages/Home.tsx";
import Login from "../pages/security/Login.tsx";
import Signup from "../pages/security/Signup.tsx";
import ForgotPassword from "../pages/security/ForgotPassword.tsx";
import ResetPassword from "../pages/security/ResetPassword.tsx";

const homeRoutes: RouteObject[] = [
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <Signup/>},
    {path: '/forgot-password', element: <ForgotPassword/>},
    {path: '/reset-password', element: <ResetPassword/>}
];

export default homeRoutes;