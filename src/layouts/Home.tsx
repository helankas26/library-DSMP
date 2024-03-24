import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";

import MainHeader from "../components/core/MainHeader.tsx";
import MainFooter from "../components/core/MainFooter.tsx";
import useAuth from "../hooks/use-auth.ts";
import usePersist from "../hooks/use-persist.ts";

const HomeLayout: React.FC = () => {
    const {auth} = useAuth();
    const persist = usePersist();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!auth.accessToken) {
                await persist();
            }
        }

        verifyRefreshToken();
    }, []);

    return (
        <div className="flex flex-col bg-[url('assets/home-texture.png')]">
            <MainHeader/>
            <Outlet/>
            <MainFooter/>
        </div>
    );
}

export default HomeLayout;