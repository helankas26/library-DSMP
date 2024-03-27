import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

import useAuth from "../hooks/use-auth.ts";
import useUserRole from "../hooks/use-user-role.ts";

const AuthLayout: React.FC = () => {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const userRole = useUserRole();

    useEffect(() => {
        if (auth.accessToken && userRole === 'ADMIN') navigate("/dashboard");
        if (auth.accessToken && userRole === 'USER') navigate("/");
    }, [auth]);

    return (
        <Outlet/>
    );
}

export default AuthLayout;