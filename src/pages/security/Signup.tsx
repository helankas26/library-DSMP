import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AuthCard from "../../components/shared/AuthCard.tsx";
import signupImage from "../../assets/signup.jpg";
import authService from "../../services/api/auth.ts";
import ValidationIcon from "../../components/shared/ValidationIcon.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";

const Signup: React.FC = () => {
    const [registrationNo, setRegistrationNo] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isRegistrationValid, setIsRegistrationValid] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSignUpDisabled, setIsSignUpDisabled] = useState<boolean>(true);
    const {showError} = useSnackbar();

    const checkRegistrationValidHandler = useCallback(async () => {
        if (registrationNo.length === 10) {
            setLoading(true);
            try {
                const response = await authService.checkRegistrationValid(registrationNo);
                setIsRegistrationValid(response.data.valid);
                setIsSignUpDisabled(!response.data.valid);
            } catch (error: any) {
                showError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setIsRegistrationValid(undefined)
            setIsSignUpDisabled(true);
        }
    }, [registrationNo]);

    useEffect(() => {
        checkRegistrationValidHandler();
    }, [checkRegistrationValidHandler]);

    const signupHandler = (event: FormEvent) => {
        event.preventDefault();

        setRegistrationNo('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsRegistrationValid(undefined);
        setIsSignUpDisabled(true);
    };

    return (
        <AuthCard imageUrl={signupImage}>
            <div className="text-center">
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Create an Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">Please sign up to your account</p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={signupHandler}>
                <div className="relative mb-4">
                    <div className="absolute right-0 mt-7">
                        <ValidationIcon isValid={isRegistrationValid} loading={loading}/>
                    </div>
                    <label className="block mb-1 text-sm font-bold text-gray-700 tracking-wide" htmlFor="regNo">
                        Registration No
                    </label>
                    <input
                        className="w-full py-2 text-sm leading-tight text-gray-700 border-b border-gray-300 appearance-none focus:outline-none focus:border-indigo-500"
                        id="regNo"
                        type="text"
                        value={registrationNo}
                        onChange={(e) => {
                            setRegistrationNo(e.target.value);
                        }}
                        placeholder="Enter your registration No"/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Enter your username"
                    />
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
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-gray-500"
                        disabled={isSignUpDisabled}
                        type="submit">
                        Register Account
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
            </form>
        </AuthCard>
    );
}

export default Signup;