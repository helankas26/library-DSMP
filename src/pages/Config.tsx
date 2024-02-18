import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import ConfigView from "../components/config/ConfigView.tsx";

const Config: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Configuration"}/>
            </div>
            <DashboardContext>
                <ConfigView/>
            </DashboardContext>
        </>
    );
}

export default Config;