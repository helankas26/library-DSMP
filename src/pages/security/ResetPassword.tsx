import React from "react";
import AuthCard from "../../components/shared/AuthCard.tsx";

const ResetPassword: React.FC = () => {
    return (
        <AuthCard imageUrl='assets/reset-password.jpg'>
            <div className="px-8 mb-4 text-center">
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Reset Your Password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Reset your account password using OTP, check your email spam folder for OTP.
                </p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="relative mb-6">
                    <div className="absolute right-0 mt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <label className="block mb-1 text-sm font-bold text-gray-700 tracking-wide" htmlFor="otp">
                        OTP
                    </label>
                    <input
                        className="w-full py-2 text-sm leading-tight text-gray-700 border-b border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"/>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="md:ml-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide"
                               htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Register Account
                    </button>
                </div>
                <hr className="mt-10 border"/>
                <div className="text-center flex flex-col items-center justify-center">
                    <p className="mt-10 text-md text-gray-500">
                        Already have an account?
                    </p>
                    <a href="#"
                       className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                        Log in
                    </a>
                </div>
            </form>
        </AuthCard>
    );
}

export default ResetPassword;