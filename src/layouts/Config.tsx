import React from "react";
import {Outlet} from "react-router-dom";

import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";

const ConfigLayout: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Configuration"}/>
            </div>
            <DashboardContext>
                <Outlet/>
            </DashboardContext>
        </>
    );
}

export default ConfigLayout;