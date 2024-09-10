import React, {Fragment} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Dialog, Transition} from "@headlessui/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ViewComfyAltRoundedIcon from "@mui/icons-material/ViewComfyAltRounded";
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

const DashboardNavModal: React.FC<{ open: boolean; closeHandler: () => void; }> = (props) => {
    const {open, closeHandler} = props;

    const dashboardRoutes = useAppSelector((state) => state.dashboardRoutes);
    const subRoutes = useAppSelector((state) => state.subRoutes);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const loadNavLinkIcon = (iconName: string) => {
        switch (iconName) {
            case 'GroupAddRoundedIcon':
                return (<GroupAddRoundedIcon fontSize="large" className="mx-1"/>);
            case 'ShoppingCartRoundedIcon':
                return (<ShoppingCartRoundedIcon fontSize="large" className="mx-1"/>);
            case 'AutoStoriesRoundedIcon':
                return (<AutoStoriesRoundedIcon fontSize="large" className="mx-1"/>);
            case 'StyleRoundedIcon':
                return (<StyleRoundedIcon fontSize="large" className="mx-1"/>);
            case 'PaidRoundedIcon':
                return (<PaidRoundedIcon fontSize="large" className="mx-1"/>);
            case 'PaymentsRoundedIcon':
                return (<PaymentsRoundedIcon fontSize="large" className="mx-1"/>);
            case 'CardMembershipRoundedIcon':
                return (<CardMembershipRoundedIcon fontSize="large" className="mx-1"/>);
            case 'AdminPanelSettingsRoundedIcon':
                return (<AdminPanelSettingsRoundedIcon fontSize="large" className="mx-1"/>);
            case 'SettingsSuggestRoundedIcon':
                return (<SettingsSuggestRoundedIcon fontSize="large" className="mx-1"/>);
        }
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeHandler}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">

                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">

                            <Dialog.Panel
                                className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                <div className="flex gap-4 w-full items-center justify-center flex-wrap">
                                    <NavLink
                                        to="home"
                                        onClick={() => dispatch(clearSubRoutes())}
                                        className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 bg-slate-200 hover:bg-gray-300 hover:text-purple-700 rounded-lg`}>
                                        <HomeRoundedIcon fontSize="large" className="mx-1"/>
                                    </NavLink>

                                    <NavLink
                                        to="/"
                                        className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 bg-slate-200 hover:bg-gray-300 hover:text-purple-700 rounded-lg`}>
                                        <ViewComfyAltRoundedIcon fontSize="large" className="mx-1"/>
                                    </NavLink>

                                    {dashboardRoutes.map((dashboardRoute) => (
                                        <NavLink
                                            key={dashboardRoute._id}
                                            to={dashboardRoute.path}
                                            onClick={() => dispatch(setSubRoutes(dashboardRoute.subRoutes))}
                                            className={({isActive}) => {
                                                return (
                                                    `${isActive || subRoutes.length && (dashboardRoute.path === subRoutes[0].path && subRoutes.find((subRoute) => subRoute.path === location.pathname.split("/")[location.pathname.split("/").length - 1]))
                                                        ? `text-purple-500`
                                                        : undefined
                                                    } cursor-pointer px-2 py-2 bg-slate-200 hover:bg-gray-300 hover:text-purple-700 rounded-lg`
                                                )
                                            }}>
                                            {loadNavLinkIcon(dashboardRoute.icon)}
                                        </NavLink>
                                    ))}
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default DashboardNavModal;