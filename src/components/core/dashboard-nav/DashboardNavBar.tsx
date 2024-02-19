import React from "react";
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
import {NavLink} from "react-router-dom";

const DashboardNavBar: React.FC = () => {
    return (
        <div
            className="mx-1.5 w-52 py-4 px-2 text-gray-700 bg-white rounded-lg text-left capitalize font-medium shadow-lg">
            <NavLink
                to="/dashboard"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}
                end>
                <HomeRoundedIcon className="mx-1"/>
                <span className="mx-5">Home</span>
            </NavLink>

            <NavLink
                to="/"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <ViewComfyAltRoundedIcon className="mx-1"/>
                <span className="mx-5">Main Page</span>
            </NavLink>

            <NavLink
                to="profiles"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <GroupAddRoundedIcon className="mx-1"/>
                <span className="mx-5">Registration</span>
            </NavLink>

            <NavLink
                to="transactions"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <ShoppingCartRoundedIcon className="mx-1"/>
                <span className="mx-5">Book Lending</span>
            </NavLink>

            <NavLink
                to="books"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <AutoStoriesRoundedIcon className="mx-1"/>
                <span className="mx-5">Books</span>
            </NavLink>

            <NavLink
                to="reservations"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <StyleRoundedIcon className="mx-1"/>
                <span className="mx-5">Reservation</span>
            </NavLink>

            <NavLink
                to="subscriptions"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <PaidRoundedIcon className="mx-1"/>
                <span className="mx-5">Payment</span>
            </NavLink>

            <NavLink
                to="fines"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <PaymentsRoundedIcon className="mx-1"/>
                <span className="mx-5">Fine</span>
            </NavLink>

            <NavLink
                to="admissions"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <CardMembershipRoundedIcon className="mx-1"/>
                <span className="mx-5">Admission</span>
            </NavLink>

            <NavLink
                to="users"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <AdminPanelSettingsRoundedIcon className="mx-1"/>
                <span className="mx-5">Users</span>
            </NavLink>

            <NavLink
                to="configurations"
                className={({isActive}) => `${isActive ? `text-purple-500` : undefined} cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center`}>
                <SettingsSuggestRoundedIcon className="mx-1"/>
                <span className="mx-5">Configuration</span>
            </NavLink>
        </div>
    );
}

export default DashboardNavBar;