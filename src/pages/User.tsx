import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import UserList from "../components/user/UserList.tsx";

const User: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"User"}/>
            </div>
            <DashboardContext>
                <UserList/>
            </DashboardContext>
        </>
    );
}

export default User;