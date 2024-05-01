import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const DashboardLayout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('verification', {replace: true});
    }, []);

    return (
        <Outlet/>
    );
}

export default DashboardLayout;