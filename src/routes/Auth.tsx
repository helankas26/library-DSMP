import {RouteObject} from "react-router/dist/lib/context";
import {Navigate} from "react-router-dom";
import Login from "../pages/security/Login.tsx";
import Signup from "../pages/security/Signup.tsx";
import ForgotPassword from "../pages/security/ForgotPassword.tsx";
import ResetPassword from "../pages/security/ResetPassword.tsx";

const authRoutes: RouteObject[] = [
    {index: true, element: <Navigate to="login" replace={true}/>},
    {path: 'login', element: <Login/>},
    {path: 'signup', element: <Signup/>},
    {path: 'forgot-password', element: <ForgotPassword/>},
    {path: 'reset-password', element: <ResetPassword/>}
];

export default authRoutes;