import React from "react";
import LoggedMenu from "../../shared/LoggedMenu.tsx";

const DashboardHeader: React.FC = () => {
    return (
        <div className="bg-[#E2E8F0] pt-2">
            <div
                className="mx-1.5 py-2 px-2 bg-white rounded-lg shadow-lg flex items-center justify-between">
                <div className="px-2 mr-2 border-r border-gray-800">
                    <div
                        className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                        Library
                    </div>
                </div>
                <div
                    className="text-gray-700 font-medium capitalize flex flex-1 flex-wrap items-center justify-start gap-2.5">
                    <div
                        className="cursor-pointer px-4 py-2 bg-gray-300 hover:text-orange-700 rounded flex items-center">
                        Main Page
                    </div>
                    <div
                        className="cursor-pointer px-4 py-2 bg-gray-300 hover:text-orange-700 rounded flex items-center">
                        Main Page
                    </div>
                    <div
                        className="cursor-pointer px-4 py-2 bg-gray-300 hover:text-orange-700 rounded flex items-center">
                        Main Page
                    </div>
                </div>
                <div className="mr-1">
                    <LoggedMenu/>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;