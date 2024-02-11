import React from "react";
import {Menu} from '@headlessui/react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const LoggedMenu: React.FC = () => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="text-sm bg-gray-600 hover:bg-slate-700 rounded-full">
                        <img className="w-8 h-8 rounded-full" src="" alt="user photo"/>
                    </Menu.Button>
                </div>

                <Menu.Items
                    className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 divide-y divide-gray-100">
                        <div className="px-4 py-3">
                            <Menu.Item>
                                <>
                                    <span className="block text-sm text-gray-900">Helanka S.</span>
                                    <span className="block text-sm text-gray-500 truncate">helankas26@gmail.com</span>
                                </>
                            </Menu.Item>
                        </div>

                        <div>
                            <Menu.Item>
                                {({active}) => (
                                    <a href="#"
                                       className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Dashboard
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Account settings
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        type="submit"
                                        className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}>
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