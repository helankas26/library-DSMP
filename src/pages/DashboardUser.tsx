import React from "react";

import useUserRole from "../hooks/use-user-role.ts";
import DashboardLibrarian from "./DashboardLibrarian.tsx";
import DashboardMember from "./DashboardMember.tsx";

const DashboardUser: React.FC = () => {
    const {isAdmin, isUser} = useUserRole();

    return (
        <>
            {isAdmin() && <DashboardLibrarian/>}
            {isUser() && <DashboardMember/>}
        </>
    );
}

export default DashboardUser;