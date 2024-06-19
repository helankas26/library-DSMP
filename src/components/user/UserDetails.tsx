import React from "react";

import User from "../../model/User.ts";

const UserDetails: React.FC<{ record: User }> = (props) => {
    const {record: user} = props;
    const createdAt = new Date(user.createdAt).toISOString().split('T')[0];

    return (
        user && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center">
                        <img
                            className="w-auto h-36 rounded-lg"
                            src={user.profile.avatar}/>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-52 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="id"
                                   className="w-full text-gray-600 font-semibold">ID</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="id"
                                type="text"
                                value={user.profile._id}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="username"
                                   className="w-full text-gray-600 font-semibold">Username</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                value={user.username}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="role"
                                   className="w-full text-gray-600 font-semibold">Role</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="role"
                                type="text"
                                value={user.role}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fullName"
                                   className="w-full text-gray-600 font-semibold">Full Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                value={user.profile.fullName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="createdAt"
                                   className="w-full text-gray-600 font-semibold">Signed Date</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="createdAt"
                                type="text"
                                value={createdAt}
                                disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default UserDetails;