import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import useAuth from "../hooks/use-auth.ts";
import usePersist from "../hooks/use-persist.ts";
import {useAppDispatch} from "../hooks/use-store.ts";
import {loadDashboardRoutes} from "../store/dashboard-route/dashboard-route-actions.ts";

const Verification: React.FC = () => {
    const {auth} = useAuth();
    const persist = usePersist();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const to = location.state?.to;

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (!auth.accessToken) {
                await persist();
            }
        }

        verifyRefreshToken();
    }, []);

    useEffect(() => {
        const getDashboardRoutes = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(dispatch(loadDashboardRoutes()));
                }, 1000);
            });
        }

        if (auth.accessToken && auth.profile) {
            getDashboardRoutes().then(() => {
                if (to) {
                    navigate(to, {replace: true});
                } else {
                    navigate('/dashboard/console', {replace: true});
                }
            });
        }
    }, [dispatch, navigate]);

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <div
                className="p-2.5 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300 transition-all group-hover:text-7xl">
                Library
            </div>
            <p className="text-[1.17rem] text-center">loading...</p>
        </div>
    );
}

export default Verification;