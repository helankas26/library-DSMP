import React from "react";
import Profile from "../model/Profile.ts";

interface AuthContextType {
    auth: { accessToken: string | undefined, profile: Profile | undefined },
    dispatchAuth: React.Dispatch<{
        type: string;
        auth: { accessToken?: string | undefined, profile?: Profile | undefined }
    }>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export default AuthContext;