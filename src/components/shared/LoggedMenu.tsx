import React from "react";
import {Menu} from '@headlessui/react'
import {Link, useNavigate} from "react-router-dom";

import profileAvatarImage from "../../assets/profile-avatar.jpg";
import useLogout from "../../hooks/use-logout.ts";
import useAuth from "../../hooks/use-auth.ts";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const LoggedMenu: React.FC = () => {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const logout = useLogout();

    const signOutHandler = async () => {
        navigate("/");
        await logout();
    }

    return (
        <>
            <Menu as="div" className="relative inline-block text-left mt-1">
                <div className="-mb-1">
                    <Menu.Button
                        className="text-sm bg-gray-600 hover:bg-slate-700 rounded-full">
                        <img className="w-8 h-8 rounded-full"
                             src={auth.profile?.avatar ? auth.profile.avatar : profileAvatarImage} alt="user photo"/>
                    </Menu.Button>
                </div>

                <Menu.Items
                    className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 divide-y divide-gray-100">
                        <div className="px-4 py-3">
                            <Menu.Item>
                                <>
                                    <span className="block text-sm text-gray-900">
                                        {auth.profile ? auth.profile.fullName : 'Helanka S.'}
                                    </span>
                                    <span className="block text-sm text-gray-500 truncate">
                                        {auth.profile ? auth.profile.email : 'helankas26@gmail.com'}
                                    </span>
                                </>
                            </Menu.Item>
                        </div>

                        <div>
                            <Menu.Item>
                                {({active}) => (
                                    <Link
                                        to="/dashboard"
                                        className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Dashboard
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <Link
                                        to="/dashboard/account/settings"
                                        className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Account settings
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}
                                        type="button"
                                        onClick={signOutHandler}>
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </div>
                </Menu.Items>
            </Menu>
        </>
    );
}

export default LoggedMenu;