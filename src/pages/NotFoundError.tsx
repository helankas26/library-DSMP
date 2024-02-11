import React from "react";
import {Link} from "react-router-dom";

const NotFoundError: React.FC = () => {
    return (
        <>
            <div className="to-black/10 bg-gradient-to-t from-black/95 via-black/35">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div
                        className="bg-[url('assets/home-texture.png')] shadow-2xl drop-shadow-2xl overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-9xl font-bold text-purple-400">404</h1>
                            <h1 className="text-6xl font-medium py-8">Oops! Page Not Found</h1>
                            <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not
                                exist. It might have been moved or deleted.</p>
                            <Link to='/'
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
        </>
    );
}

export default NotFoundError;