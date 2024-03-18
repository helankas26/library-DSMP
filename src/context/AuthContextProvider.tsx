import React, {ReactNode, useReducer} from "react";
import AuthContext from "./auth-context.ts";
import Profile from "../model/Profile.ts";

const authReducer = (
    state: { accessToken: string | undefined, profile: Profile | undefined },
    action: {
        type: string; auth: { accessToken?: string | undefined, profile?: Profile | undefined }
    }) => {
    if (action.type === 'SET_TOKEN') {
        return {accessToken: action.auth.accessToken, profile: state.profile};
    }
    if (action.type === 'SET_PROFILE') {
        return {accessToken: state.accessToken, profile: action.auth.profile};
    }

    return {accessToken: action.auth.accessToken, profile: action.auth.profile};
}

const AuthContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [auth, dispatchAuth] = useReducer(
        authReducer,
        {accessToken: undefined, profile: undefined}
    );

    return (
        <AuthContext.Provider value={{auth, dispatchAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;