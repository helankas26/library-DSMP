import React, {ReactNode, useReducer} from "react";

import AuthContext, {Auth} from "./auth-context.ts";
import Profile from "../model/Profile.ts";

const defaultAuthState: Auth = {
    accessToken: undefined,
    profile: undefined
};

const authReducer = (
    state: Auth,
    action: {
        type: string; auth: { accessToken?: string, profile?: Profile }
    }) => {

    if (action.type === 'SET_TOKEN') {
        return {accessToken: action.auth.accessToken, profile: state.profile};
    }

    if (action.type === 'SET_PROFILE') {
        return {accessToken: state.accessToken, profile: action.auth.profile};
    }

    if (action.type === 'LOGOUT') {
        return {accessToken: action.auth.accessToken, profile: action.auth.profile};
    }

    return defaultAuthState;
}

const AuthContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [auth, dispatchAuth] = useReducer(authReducer, defaultAuthState);

    return (
        <AuthContext.Provider value={{auth, dispatchAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;