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

const DashboardNavBar: React.FC = () => {
    return (
        <div
            className="mx-1.5 w-60 py-4 px-2 text-gray-700 bg-white rounded-lg text-left capitalize font-medium shadow-lg">
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <HomeRoundedIcon className="mx-1"/>
                <span className="mx-5">Home</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <ViewComfyAltRoundedIcon className="mx-1"/>
                <span className="mx-5">Main Page</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <GroupAddRoundedIcon className="mx-1"/>
                <span className="mx-5">Registration</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <ShoppingCartRoundedIcon className="mx-1"/>
                <span className="mx-5">Book Lending</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <AutoStoriesRoundedIcon className="mx-1"/>
                <span className="mx-5">Books</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <StyleRoundedIcon className="mx-1"/>
                <span className="mx-5">Reservation</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <PaidRoundedIcon className="mx-1"/>
                <span className="mx-5">Payment</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <PaymentsRoundedIcon className="mx-1"/>
                <span className="mx-5">Fine</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <CardMembershipRoundedIcon className="mx-1"/>
                <span className="mx-5">Admission</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <AdminPanelSettingsRoundedIcon className="mx-1"/>
                <span className="mx-5">Users</span>
            </div>
            <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-200 hover:text-purple-700 rounded mb-2.5 flex items-center">
                <SettingsSuggestRoundedIcon className="mx-1"/>
                <span className="mx-5">Configuration</span>
            </div>
        </div>
    );
}

export default DashboardNavBar;