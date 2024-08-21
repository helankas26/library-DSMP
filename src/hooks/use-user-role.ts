import {useEffect, useReducer} from "react";
import {jwtDecode} from "jwt-decode";

import useAuth from "./use-auth.ts";
import UserRole from "../enum/UserRole.ts";

const userRoleReducer = (role: string | undefined, action: { type: string; role: string | undefined; }) => {
    if (action.type === 'SET_ROLE') {
        return action.role;
    }
    return role;
}

const useUserRole = () => {
    const {auth} = useAuth();
    const [userRole, dispatchUserRole] = useReducer(userRoleReducer, undefined);

    useEffect(() => {
        const decodeToken = auth.accessToken ? jwtDecode<{ id: string, role: string }>(auth.accessToken) : undefined;
        const role = decodeToken?.role || undefined;
        dispatchUserRole({type: 'SET_ROLE', role: role});
    }, [auth.accessToken]);

    const isAdmin = () => userRole === UserRole.Admin;
    const isUser = () => userRole === UserRole.User;

    return {userRole, isAdmin, isUser};
}

export default useUserRole;