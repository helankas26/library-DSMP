import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";

import useAuth from "../hooks/use-auth.ts";
import {getTokenDuration} from "../utils/local-storage.ts";
import useLogout from "../hooks/use-logout.ts";
import DashboardNavBar from "../components/core/dashboard-nav/DashboardNavBar.tsx";
import DashboardHeader from "../components/core/dashboard-nav/DashboardHeader.tsx";
import DashboardFooter from "../components/core/dashboard-nav/DashboardFooter.tsx";
import DashboardNavFloatingActionButton from "../components/core/dashboard-nav/DashboardNavFloatingActionButton.tsx";

const ConsoleLayout: React.FC = () => {
    const {auth} = useAuth();
    const logout = useLogout();
    const location = useLocation();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        if (!auth.accessToken) {
            navigate('/dashboard/verification', {state: location.state, replace: true});
        }

        setIsAuthChecked(true);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (auth.accessToken) {
            const tokenDuration = getTokenDuration();

            timer = setTimeout(async () => {
                await logout();
            }, tokenDuration);
        }

        return () => {
            clearTimeout(timer);
        }
    }, []);

    if (!isAuthChecked) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="flex flex-col bg-[#E2E8F0] h-screen">
                <div className="flex flex-1 overflow-auto">
                    <div className="hidden sm:block sm:sticky sm:top-2 mt-2 mb-6 mx-1.5 rounded-lg overflow-auto no-scrollbar">
                        <div className="mb-0">
                            <DashboardNavBar/>
                        </div>
                    </div>
                    <div className="w-9/12 h-full flex flex-col flex-1">
                        <div className="sm:sticky sm:top-0 z-50">
                            <DashboardHeader/>
                        </div>
                        <div className="m-1.5 h-full rounded-md overflow-auto no-scrollbar z-40">
                            <Outlet/>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <DashboardFooter/>
                </div>
            </div>

            {isSmallScreen && <DashboardNavFloatingActionButton/>}
        </React.Fragment>
    );
}

export default ConsoleLayout;