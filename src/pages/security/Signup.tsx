import React from "react";
import AuthCard from "../../components/shared/AuthCard.tsx";

const Signup: React.FC = () => {
    return (
        <AuthCard>
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Create an Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">Please sign up to your account</p>
            </div>

            <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="relative">
                    <div className="absolute right-0 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Registration No</label>
                    <input
                        className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="" placeholder="Enter your registration No"/>
                </div>
            </form>

            <hr className="-m-10 border-2 border-blue-500"/>

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
                <div className="mt-8 content-center">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Confirm Password
                    </label>
                    <input
                        className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password" placeholder="Confirm your password"/>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Sign up
                    </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Already have an account?</span>
                    <a href="#"
                       className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                        Log in
                    </a>
                </p>
            </form>
        </AuthCard>
    );
}

export default Signup;