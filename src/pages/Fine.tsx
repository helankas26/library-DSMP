import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import FineList from "../components/fine/FineList.tsx";

const Fine: React.FC = () => {
    return (
        <>
            <div className="sticky top-0">
                <TitleBar title={"Fines"}/>
            </div>
            <DashboardContext>
                <FineList/>
            </DashboardContext>
        </>
    );
}

export default Fine;