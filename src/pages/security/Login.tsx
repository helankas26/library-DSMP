import React, {FormEvent, useState} from "react";
import {Link, useNavigate, useLocation, Form} from "react-router-dom";

import AuthCard from "../../components/shared/AuthCard.tsx";
import loginImage from "../../assets/login.jpg";
import authService from "../../services/api/auth.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useAuth from "../../hooks/use-auth.ts";
import {setRefreshTokenExpirationDate} from "../../utils/local-storage.ts";
import UserRole from "../../enum/UserRole.ts";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {dispatchAuth} = useAuth();
    const {showError} = useSnackbar();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    let from = location.state?.from?.pathname;

    const loginHandler = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await authService.login(username, password);
            const {accessToken, user, refreshTokenExpires} = response.data;

            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: accessToken}});
            setRefreshTokenExpirationDate(refreshTokenExpires);
            setUsername('');

            from = from ?? (user.role === UserRole.Admin ? '/dashboard' : user.role === UserRole.User ? '/' : '/');
            navigate(from, {replace: true});
        } catch (error: any) {
            showError(error);
        } finally {
            setPassword('');
        }
    };

    return (
        <AuthCard imageUrl={loginImage}>
            <div className="text-center">
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
            </div>
            <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={loginHandler}>
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
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 tracking-wide" htmlFor="password">
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
                <div className="relative py-3 mb-4 flex items-center justify-between">
                    <div className="absolute right-0 text-sm">
                        <Link to="/auth/forgot-password"
                              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
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
                </div>
            </Form>
        </AuthCard>
    );
}

export default Login;