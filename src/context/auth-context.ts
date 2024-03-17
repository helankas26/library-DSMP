import React from "react";
import Profile from "../model/Profile.ts";

interface AuthContextType {
    auth: { accessToken: string | undefined, profile: Profile | null },
    setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string | undefined, profile: Profile | null }>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export default AuthContext;