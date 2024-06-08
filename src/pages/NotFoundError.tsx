import React from "react";
import {Link} from "react-router-dom";

const NotFoundError: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col h-screen">
            <div className="to-black/10 bg-gradient-to-t from-black/95 via-black/35 overflow-hidden">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div className="bg-[url('assets/home-texture.png')] shadow-2xl drop-shadow-2xl overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-9xl font-bold text-purple-400">404</h1>
                            <h1 className="text-6xl font-medium py-8">Oops! Page Not Found</h1>
                            <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not
                                exist. It might have been moved or deleted.</p>
                            <Link to='/' replace={true}
                                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                                HOME
                            </Link>
                            <button type="button"
                                    onClick={() => {
                                        window.location.href = 'mailto:helankas26@gmail.com'
                                    }}
                                    className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block">
                <div className="px-4 pb-1 space-y-8 overflow-hidden sm:px-6 lg:px-8 bg-white}">
                    <p className="text-base leading-6 text-center text-[#334155]">
                        Copyright &copy; {currentYear}
                        &nbsp;
                        <span
                            className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                            Library
                        </span>
                        &nbsp;
                        by Helanka. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NotFoundError;