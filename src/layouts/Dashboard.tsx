import React from "react";
import DashboardNavBar from "../components/core/dashboard-nav/DashboardNavBar.tsx";
import DashboardHeader from "../components/core/dashboard-nav/DashboardHeader.tsx";
import DashboardFooter from "../components/core/dashboard-nav/DashboardFooter.tsx";
import {Outlet} from "react-router-dom";

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex flex-col bg-[#E2E8F0] h-screen">
            <div className="flex flex-1 overflow-auto">
                <div className="hidden sm:block sm:sticky sm:top-2 mt-2 overflow-auto no-scrollbar">
                    <div className="pb-6">
                        <DashboardNavBar/>
                    </div>
                </div>
                <div className="w-full flex flex-col flex-1">
                    <div className="z-50 sm:sticky sm:top-0">
                        <DashboardHeader/>
                    </div>
                    <Outlet/>
                </div>
            </div>
            <DashboardFooter/>
        </div>

    );
}

export default DashboardLayout;