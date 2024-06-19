import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import User from "../../model/User.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import userService from "../../services/api/user.ts";

const UserUpdateForm: React.FC<{
    user: User;
    setUpdateUser: Dispatch<SetStateAction<User | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshUsers: () => Promise<void>
}> = (props) => {
    const {user, setUpdateUser, setToggleUpdate, onRefreshUsers} = props;
    const {showError, showAlert} = useSnackbar();

    const [role, setRole] = useState<'ADMIN' | 'USER'>(user.role);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateUserHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedUser: User = {
            role: role
        } as User;

        try {
            await userService.updateUser(user._id, editedUser);
            showAlert("User updated successfully!", "success");
            await onRefreshUsers();
            setToggleUpdate(false);
            setUpdateUser(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateUser(undefined);
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-14 h-14">
                        <img className="w-full h-full border rounded-full"
                             src={user.profile.avatar}
                             alt={user.profile.fullName}/>
                    </div>
                    <div className="ml-3">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{user.profile._id}</p>
                        <p className="text-gray-900">{user.profile.fullName}</p>
                    </div>
                </div>

                <Form className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10" onSubmit={updateUserHandler}>
                    <div className="w-full">
                        <label htmlFor="role"
                               className="block text-gray-600 text-sm font-semibold mb-2">Role</label>
                        <div className="flex justify-center gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                            <div className="w-full">
                                <input
                                    className="peer hidden"
                                    id="user"
                                    type="radio"
                                    value="USER"
                                    name="role"
                                    onChange={() => {
                                        setRole("USER");
                                    }}
                                    checked={role === "USER"}/>
                                <label htmlFor="user"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">USER</label>
                            </div>
                            <div className="w-full">
                                <input
                                    className="peer hidden"
                                    id="admin"
                                    type="radio"
                                    value="ADMIN"
                                    name="role"
                                    onChange={() => {
                                        setRole("ADMIN");
                                    }}
                                    checked={role === "ADMIN"}/>
                                <label htmlFor="admin"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">ADMIN</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                        <CancelButton isUpdating={isUpdating} onCancel={cancelUpdateHandler}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default UserUpdateForm;