import React, {ReactNode, useState} from "react";
import AuthContext from "./auth-context.ts";

const AuthContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [auth, setAuth] = useState<any>(null);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;