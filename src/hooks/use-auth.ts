import {useContext} from "react";
import AuthContext from "../context/auth-context.ts";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;