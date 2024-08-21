import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {Form, Link, useNavigate} from "react-router-dom";

import AuthCard from "../../components/shared/AuthCard.tsx";
import resetPasswordImage from "../../assets/reset-password.jpg";
import authService from "../../services/api/auth.ts";
import ValidationIcon from "../../components/shared/ValidationIcon.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import {setRefreshTokenExpirationDate} from "../../utils/local-storage.ts";
import useAuth from "../../hooks/use-auth.ts";
import UserRole from "../../enum/UserRole.ts";

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const {dispatchAuth} = useAuth();
    const {showError, showAlert} = useSnackbar();

    const [otp, setOtp] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isOtpValid, setIsOtpValid] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSignUpDisabled, setIsSignUpDisabled] = useState<boolean>(true);

    const checkOtpValidHandler = useCallback(async () => {
        if (otp.length === 16) {
            setLoading(true);
            try {
                const response = await authService.checkOtpValid(otp);
                const {valid} = response.data;
                setIsOtpValid(valid);
                setIsSignUpDisabled(!valid);
            } catch (error: any) {
                showError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setIsOtpValid(undefined)
            setIsSignUpDisabled(true);
        }
    }, [otp]);

    useEffect(() => {
        checkOtpValidHandler();
    }, [checkOtpValidHandler]);

    const resetPasswordHandler = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await authService.resetPassword(otp, password, confirmPassword);
            const {accessToken, user, refreshTokenExpires} = response.data;

            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: accessToken}});
            setRefreshTokenExpirationDate(refreshTokenExpires);
            showAlert("Password reset successfully!", "success");
            setOtp('');

            const to: string = user.role === UserRole.Admin ? '/dashboard' : user.role === UserRole.User ? '/' : '/';
            navigate(to, {replace: true});
        } catch (error: any) {
            showError(error);
        } finally {
            setOtp('');
            setPassword('');
            setConfirmPassword('');
            setIsOtpValid(undefined);
            setIsSignUpDisabled(true);
        }
    };

    return (
        <AuthCard imageUrl={resetPasswordImage}>
            <div className="px-8 mb-4 text-center">
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Reset Your Password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Reset your account password using OTP, check your email inbox or spam folder for OTP.
                </p>
            </div>
            <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={resetPasswordHandler}>
                <div className="relative mb-6">
                    <div className="absolute right-0 mt-7">
                        <ValidationIcon isValid={isOtpValid} loading={loading}/>
                    </div>
                    <label className="block mb-1 text-sm font-bold text-gray-700 tracking-wide" htmlFor="otp">
                        OTP
                    </label>
                    <input
                        className="w-full py-2 text-sm leading-tight text-gray-700 border-b border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                        placeholder="Enter OTP"/>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide"
                               htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
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
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-gray-500"
                        disabled={isSignUpDisabled}
                        type="submit">
                        Reset Password
                    </button>
                </div>
                <hr className="mt-10 border"/>
                <div className="text-center flex flex-col items-center justify-center">
                    <p className="mt-10 text-md text-gray-500">
                        Already have an account?
                    </p>
                    <Link to="/auth/login"
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                        Log in
                    </Link>
                </div>
            </Form>
        </AuthCard>
    );
}

export default ResetPassword;