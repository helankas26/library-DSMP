import React from "react";
import AuthCard from "../../components/shared/AuthCard.tsx";
import {Link} from "react-router-dom";

const ForgotPassword: React.FC = () => {
    return (
        <AuthCard imageUrl='assets/forget-password.jpg'>
            <div className="px-8 mb-4 text-center">
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Forgot Your Password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Just enter your email address below and we'll send you a
                    OTP to reset your password!
                </p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter Email Address..."
                    />
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Send OTP
                    </button>
                </div>
                <hr className="mt-10 border"/>
                <div className="text-center flex flex-col items-center justify-center">
                    <p className="mt-10 text-md text-gray-500">
                        Don't have an account?
                    </p>
                    <Link to="/auth/signup"
                       className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                        Sign up
                    </Link>
                    <p className="mt-5 text-md text-gray-500">
                        Already have an account?
                    </p>
                    <Link to="/auth/login"
                       className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                        Log in
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

export default ForgotPassword;