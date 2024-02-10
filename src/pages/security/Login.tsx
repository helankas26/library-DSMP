import React from "react";
import AuthCard from "../../components/shared/AuthCard.tsx";

const Login: React.FC = () => {
    return (
        <AuthCard>
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="relative">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Username</label>
                    <input
                        className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text" placeholder="Enter your username"/>
                </div>
                <div className="mt-8 content-center">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Password
                    </label>
                    <input
                        className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password" placeholder="Enter your password"/>
                </div>
                <div className="relative py-3 flex items-center justify-between">
                    <div className="absolute right-0 text-sm">
                        <a href="#" className="font-medium text-indigo-500 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Log in
                    </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Don't have an account?</span>
                    <a href="#"
                       className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                        Sign up
                    </a>
                </p>
            </form>
        </AuthCard>
    );
}

export default Login;