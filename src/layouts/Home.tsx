import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

import MainHeader from "../components/core/MainHeader.tsx";
import MainFooter from "../components/core/MainFooter.tsx";
import useAuth from "../hooks/use-auth.ts";
import usePersist from "../hooks/use-persist.ts";
import useLogout from "../hooks/use-logout.ts";
import {getTokenDuration} from "../utils/local-storage.ts";
import HomeStateContext from "../model/HomeStateContext.ts";

const HomeLayout: React.FC = () => {
    const location = useLocation();
    const {auth} = useAuth();
    const persist = usePersist();
    const logout = useLogout();

    const [page, setPage] = useState<number>(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>('');
    const [searchText, setSearchText] = useState<string>('');
    const [searching, setSearching] = useState<string>('');

    const changeSearchTextHandler = () => {
        setSelectedCategoryId(undefined);
        setPage(1);
        setSearchText(searching);
    };

    useLayoutEffect(() => {
        const verifyRefreshToken = async () => {
            if (!auth.accessToken && !location.state) {
                await persist();
            }
        }

        verifyRefreshToken();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (auth.accessToken) {
            const tokenDuration = getTokenDuration();

            timer = setTimeout(async () => {
                await logout();
            }, tokenDuration);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [auth.accessToken, logout]);

    useEffect(() => {
        if (!searching) {
            setPage(1);
            setSearchText('');
            setSelectedCategoryId('');
        }
    }, [searching]);

    useEffect(() => {
        return () => {
            if (!location.pathname.startsWith("/auth")) {
                setPage(1);
                setSelectedCategoryId('');
                setSearchText('');
                setSearching('');
            }
        };
    }, [location.pathname]);

    const contextValue = useMemo(() => ({
        page, setPage,
        selectedCategoryId, setSelectedCategoryId,
        searchText, setSearchText,
        searching, setSearching
    }), [page, selectedCategoryId, searchText, searching]);

    return (
        <div className="flex flex-col bg-[url('assets/home-texture.png')]">
            <MainHeader searching={searching} setSearching={setSearching} onChangeSearchText={changeSearchTextHandler}/>
            <Outlet context={contextValue satisfies HomeStateContext}/>
            <MainFooter/>
        </div>
    );
}

export default HomeLayout;