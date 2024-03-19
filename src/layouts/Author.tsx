import React from "react";
import {Outlet} from "react-router-dom";

import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";

const AuthorLayout: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Authors"}/>
            </div>
            <DashboardContext>
                <Outlet/>
            </DashboardContext>
        </>
    );
}

export default AuthorLayout;