import React from "react";

import useUserRole from "../hooks/use-user-role.ts";
import DashboardLibrarian from "./DashboardLibrarian.tsx";
import DashboardMember from "./DashboardMember.tsx";


const DashboardUser: React.FC = () => {
    const userRole = useUserRole();

    return (
        <>
            {userRole === 'ADMIN' && <DashboardLibrarian/>}
            {userRole === 'USER' && <DashboardMember/>}
        </>
    );
}

export default DashboardUser;