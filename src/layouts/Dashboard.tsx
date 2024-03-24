import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";

import DashboardNavBar from "../components/core/dashboard-nav/DashboardNavBar.tsx";
import DashboardHeader from "../components/core/dashboard-nav/DashboardHeader.tsx";
import DashboardFooter from "../components/core/dashboard-nav/DashboardFooter.tsx";
import useAuth from "../hooks/use-auth.ts";
import usePersist from "../hooks/use-persist.ts";

const DashboardLayout: React.FC = () => {
    const {auth} = useAuth();
    const persist = usePersist();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!auth.accessToken) {
                await persist();
            }
        }

        verifyRefreshToken();
    }, []);

    return (
        <div className="flex flex-col bg-[#E2E8F0] h-screen">
            <div className="flex flex-1 overflow-auto">
                <div className="hidden sm:block sm:sticky sm:top-2 mt-2 overflow-auto no-scrollbar">
                    <div className="pb-6">
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
    );
}

export default DashboardLayout;