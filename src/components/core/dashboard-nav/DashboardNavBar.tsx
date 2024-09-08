import React from "react";
import {NavLink, useLocation} from "react-router-dom";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ViewComfyAltRoundedIcon from '@mui/icons-material/ViewComfyAltRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import {useAppDispatch, useAppSelector} from "../../../hooks/use-store.ts";
import {setSubRoutes, clearSubRoutes} from "../../../store/dashboard-route/sub-route-slice.ts";

const DashboardNavBar: React.FC = () => {
    const dashboardRoutes = useAppSelector((state) => state.dashboardRoutes);
    const subRoutes = useAppSelector((state) => state.subRoutes);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const loadNavLinkIcon = (iconName: string) => {
        switch (iconName) {
            case 'GroupAddRoundedIcon':
                return (<GroupAddRoundedIcon className="mx-1"/>);
            case 'ShoppingCartRoundedIcon':
                return (<ShoppingCartRoundedIcon className="mx-1"/>);
            case 'AutoStoriesRoundedIcon':
                return (<AutoStoriesRoundedIcon className="mx-1"/>);
            case 'StyleRoundedIcon':
                return (<StyleRoundedIcon className="mx-1"/>);
            case 'PaidRoundedIcon':
                return (<PaidRoundedIcon className="mx-1"/>);
            case 'PaymentsRoundedIcon':
                return (<PaymentsRoundedIcon className="mx-1"/>);
            case 'CardMembershipRoundedIcon':
                return (<CardMembershipRoundedIcon className="mx-1"/>);
            case 'AdminPanelSettingsRoundedIcon':
                return (<AdminPanelSettingsRoundedIcon className="mx-1"/>);
            case 'SettingsSuggestRoundedIcon':
                return (<SettingsSuggestRoundedIcon className="mx-1"/>);
        }
    }

    return (
        <div
            className="py-4 px-2 text-gray-700 bg-white rounded-lg text-left capitalize font-medium shadow">
            <NavLink
                to="home"
                onClick={() => dispatch(clearSubRoutes())}
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <HomeRoundedIcon className="mx-1"/>
                <span className="mx-5 hidden lg:block">Home</span>
            </NavLink>

            <NavLink
                to="/"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <ViewComfyAltRoundedIcon className="mx-1"/>
                <span className="mx-5  hidden lg:block">Main Page</span>
            </NavLink>

            {dashboardRoutes.map((dashboardRoute) => (
                <NavLink
                    key={dashboardRoute._id}
                    to={dashboardRoute.path}
                    onClick={() => dispatch(setSubRoutes(dashboardRoute.subRoutes))}
                    className={({isActive}) => {
                        return (
                            `${isActive || subRoutes.length && (dashboardRoute.path === subRoutes[0].path && subRoutes.find((subRoute) => subRoute.path === location.pathname.split("/")[location.pathname.split("/").length - 1])) ?
                                `text-purple-500` :
                                undefined
                            } cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`
                        )
                    }}>

                    {loadNavLinkIcon(dashboardRoute.icon)}
                    <span className="mx-5 hidden lg:block">{dashboardRoute.route}</span>
                </NavLink>
            ))}
        </div>
    );
}

export default DashboardNavBar;