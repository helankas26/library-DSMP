import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import User from "../../model/User.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import userService from "../../services/api/user.ts";
import Profile from "../../model/Profile.ts";

const UsernameUpdateLoggedUser: React.FC<{
    profile: Profile;
    user: User;
    setUser: Dispatch<SetStateAction<User | undefined>>
}> = (props) => {
    const {profile, user, setUser} = props;
    const {showError, showAlert} = useSnackbar();

    const [username, setUsername] = useState<string>(user.username);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateUserHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedUser: User = {
            username: username
        } as User;

        try {
            const response = await userService.updateUserByAuthUser(editedUser);
            const {user} = response.data;
            setUser(user);

            showAlert("Username updated successfully!", "success");
        } catch (error: any) {
            showError(error);
        } finally {
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

                <Form className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10" onSubmit={updateUserHandler}>
                    <div className="w-full">
                        <label htmlFor="username"
                               className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
                        <input
                            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required={true}
                            placeholder="Enter username"/>
                    </div>

                    <div className="w-full flex">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default UsernameUpdateLoggedUser;