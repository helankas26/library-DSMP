import React from "react";

import Profile from "../model/Profile.ts";

export interface Auth {
    accessToken: string | undefined,
    profile: Profile | undefined
}

export interface AuthContextType {
    auth: Auth,
    dispatchAuth: React.Dispatch<{
        type: string;
        auth: { accessToken?: string | undefined, profile?: Profile | undefined }
    }>;
}

const AuthContext = React.createContext<AuthContextType>({
    auth: {accessToken: undefined, profile: undefined},
    dispatchAuth: () => {}
});

export default AuthContext;