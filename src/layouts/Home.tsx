import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";

import MainHeader from "../components/core/MainHeader.tsx";
import MainFooter from "../components/core/MainFooter.tsx";
import useAuth from "../hooks/use-auth.ts";
import usePersist from "../hooks/use-persist.ts";
import useLogout from "../hooks/use-logout.ts";
import {getTokenDuration} from "../utils/local-storage.ts";

const HomeLayout: React.FC = () => {
    const location = useLocation();
    const {auth} = useAuth();
    const persist = usePersist();
    const logout = useLogout();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!auth.accessToken && !location.state) {
                await persist();
            }
        }

        verifyRefreshToken();
    }, []);

    useEffect(() => {
        if (auth.accessToken) {
            const tokenDuration = getTokenDuration();
            setTimeout(async () => {
                await logout();
            }, tokenDuration);
        }
    }, [auth.accessToken, logout]);

    return (
        <div className="flex flex-col bg-[url('assets/home-texture.png')]">
            <MainHeader/>
            <Outlet/>
            <MainFooter/>
        </div>
    );
}

export default HomeLayout;