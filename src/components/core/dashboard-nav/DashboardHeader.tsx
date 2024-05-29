import React from "react";
import {NavLink} from "react-router-dom";

import LoggedMenu from "../../shared/LoggedMenu.tsx";
import {useAppSelector} from "../../../hooks/use-store.ts";

const DashboardHeader: React.FC = () => {
    const subRoutes = useAppSelector((state) => state.subRoutes);

    return (
        <div className="bg-[#E2E8F0] mt-2">
            <div
                className="mx-1.5 py-2 px-2 bg-white rounded-lg flex items-center justify-between">
                <div className="px-2 mr-2 border-r-2 border-r-gray-300">
                    <div
                        className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                        Library
                    </div>
                </div>
                <div
                    className="text-gray-700 font-medium capitalize flex flex-1 flex-wrap items-center justify-start gap-2.5">

                    {subRoutes.map((subRoute) => (
                        <NavLink
                            key={subRoute._id}
                            to={subRoute.path}
                            className={({isActive}) => `${isActive ? `text-orange-700` : undefined} cursor-pointer px-4 py-2 bg-gray-300 hover:text-orange-800 rounded flex items-center`}
                            end>

                            {subRoute.subRoute}
                        </NavLink>
                    ))}

                </div>
                <div className="mr-1">
                    <LoggedMenu/>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;