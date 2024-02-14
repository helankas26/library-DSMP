import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import AdmissionList from "../components/admission/AdmissionList.tsx";

const Admission: React.FC = () => {
    return (
        <>
            <div className="sticky top-0">
                <TitleBar title={"Admissions"}/>
            </div>
            <DashboardContext>
                <AdmissionList/>
            </DashboardContext>
        </>
    );
}

export default Admission;