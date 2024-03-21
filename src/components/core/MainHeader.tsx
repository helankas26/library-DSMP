import React from "react";
import {Link} from "react-router-dom";

import LoggedMenu from "../shared/LoggedMenu.tsx";
import SearchBar from "./SearchBar.tsx";
import useAuth from "../../hooks/use-auth.ts";

const MainHeader: React.FC = () => {
    const {auth} = useAuth();

    return (
        <div className="z-50 bg-white sticky inset-x-0 top-0 pt-2">
            <div className="bg-sky-900 top-1.5 mx-1.5 rounded-lg text-white p-3">
                <nav className="flex items-center justify-between space-x-2">
                    <Link className="font-bold cursor-pointer" to="/">
                        <div
                            className="p-[1px] text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                            Library
                        </div>
                    </Link>

                    <div className="w-1/2">
                        <SearchBar/>
                    </div>

                    <div className="flex items-center space-x-4">
                        {!auth.profile &&
                            <Link to="auth/login"
                                  className="text-white bg-lime-500 hover:bg-lime-600 font-medium rounded-lg shadow-lg text-sm px-4 py-2 text-center">
                                Log in
                            </Link>
                        }

                        {auth.profile && <LoggedMenu/>}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default MainHeader;