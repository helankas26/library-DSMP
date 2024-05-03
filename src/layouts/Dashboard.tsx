import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

import {useAppDispatch} from "../hooks/use-store.ts";
import {clearDashboardRoutes} from "../store/dashboard-route/dashboard-route-slice.ts";
import {clearSubRoutes} from "../store/dashboard-route/sub-route-slice.ts";

const DashboardLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        navigate('verification', {replace: true});

        return () => {
            dispatch(clearDashboardRoutes());
            dispatch(clearSubRoutes());
        }
    }, []);

    return (
        <Outlet/>
    );
}

export default DashboardLayout;