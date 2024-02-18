import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import ProfileList from "../components/profile/ProfileList.tsx";

const Profile: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Profiles"}/>
            </div>
            <DashboardContext>
                <ProfileList/>
            </DashboardContext>
        </>
    );
}

export default Profile;