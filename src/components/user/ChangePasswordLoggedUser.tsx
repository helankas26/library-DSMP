import React, {FormEvent, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import User from "../../model/User.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import userService from "../../services/api/user.ts";
import Profile from "../../model/Profile.ts";
import useAuth from "../../hooks/use-auth.ts";
import {setRefreshTokenExpirationDate} from "../../utils/local-storage.ts";

const ChangePasswordLoggedUser: React.FC<{ profile: Profile }> = (props) => {
    const {profile} = props;
    const {dispatchAuth} = useAuth();
    const {showError, showAlert} = useSnackbar();

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateUserHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedUser: User = {
            currentPassword: currentPassword,
            password: password,
            confirmPassword: confirmPassword
        } as unknown as User;

        try {
            const response = await userService.changePasswordByAuthUser(editedUser);
            const {accessToken, refreshTokenExpires} = response.data;

            dispatchAuth({type: 'SET_TOKEN', auth: {accessToken: accessToken}});
            setRefreshTokenExpirationDate(refreshTokenExpires);
            showAlert("Password changed successfully!", "success");
        } catch (error: any) {
            showError(error);
        } finally {
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
            setIsUpdating(false);
        }
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-14 h-14">
                        <img className="w-full h-full border rounded-full"
                             src={profile.avatar}
                             alt={profile.fullName}/>
                    </div>
                    <div className="ml-3">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{profile._id}</p>
                        <p className="text-gray-900">{profile.fullName}</p>
                    </div>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={updateUserHandler}>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-evenly flex-wrap lg:flex-nowrap">
                        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                            <label htmlFor="currentPassword"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Current password</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter current assword"/>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                            <label htmlFor="password"
                                   className="block text-gray-600 text-sm font-semibold mb-2">New password</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter new password"/>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                            <label htmlFor="confirmPassword"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Confirm new password</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter new password again"/>
                        </div>
                    </div>

                    <div className="w-full flex">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ChangePasswordLoggedUser;