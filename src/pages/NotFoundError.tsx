import React from "react";
import {Link} from "react-router-dom";

import DashboardFooter from "../components/core/dashboard-nav/DashboardFooter.tsx";

const NotFoundError: React.FC = () => {

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-[url('assets/home-texture.png')] bg-white overflow-hidden">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div className="shadow-2xl overflow-hidden sm:rounded-lg pb-8 bg-gray-100">
                        <div className="border-t border-gray-100 text-center pt-8">
                            <h1 className="text-9xl font-extrabold text-purple-400">404</h1>
                            <h1 className="text-5xl font-bold py-8 text-gray-700">Oops! Page Not Found</h1>
                            <p className="text-2xl pb-8 px-12 font-light text-gray-500">
                                Oops! The page you are looking for does not exist. It might have been moved or deleted.
                            </p>
                            <Link to='/' replace={true}
                                  className="bg-sky-600 hover:bg-sky-500 active:bg-sky-600 text-white font-semibold px-6 py-3 rounded-md mr-6">
                                HOME
                            </Link>
                            <button type="button"
                                    onClick={() => {
                                        window.location.href = 'mailto:helankas26@gmail.com'
                                    }}
                                    className="bg-red-600 hover:bg-red-500 active:bg-red-600 text-white font-semibold px-6 py-3 rounded-md">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block">
                <DashboardFooter color={'bg-[#E2E8F0]'}/>
            </div>
        </div>
    );
}

export default NotFoundError;