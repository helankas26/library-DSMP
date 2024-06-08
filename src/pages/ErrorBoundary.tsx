import React from "react";
import {Link, useRouteError} from "react-router-dom";

import DashboardFooter from "../components/core/dashboard-nav/DashboardFooter.tsx";

const ErrorBoundary: React.FC = () => {
    const error: any = useRouteError();

    let message: string;

    if (error.response) {
        message = error.response.data.message;
    } else if (error.request) {
        message = error.message;
    } else {
        message = error.message;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-[url('assets/home-texture.png')] bg-white overflow-hidden">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div className="shadow-2xl overflow-hidden sm:rounded-lg pb-12 sm:px-48 bg-gray-100">
                        <div className="border-t border-gray-100 text-center pt-12">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#0284C7]">{error.response.status}</h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                                {error.response.statusText}.
                            </p>
                            <p className="mb-4 text-lg font-light text-gray-500">
                                {message}.
                            </p>
                            <Link to='/dashboard'
                                  className="inline-flex text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-600 font-medium rounded-lg text-sm px-6 py-3 text-center my-4 mr-6">
                                Dashboard
                            </Link>
                            <button type="button"
                                    onClick={() => {
                                        window.location.href = 'mailto:helankas26@gmail.com'
                                    }}
                                    className="inline-flex text-white bg-red-600 hover:bg-red-500 active:bg-red-600 font-medium rounded-lg text-sm px-6 py-3 text-center my-4">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block">
                <DashboardFooter/>
            </div>
        </div>
    );
}

export default ErrorBoundary;