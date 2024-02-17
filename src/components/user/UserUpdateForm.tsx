import React from "react";
import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";

const UserUpdateForm: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-14 h-14">
                        <img className="w-full h-full border rounded-full"
                             src="https://avatars.githubusercontent.com/u/61771292?v=4"
                             alt=""/>
                    </div>
                    <div className="ml-3">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#972701564</p>
                        <p className="text-gray-900">Helanka Singhapurage</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                        <label htmlFor="role"
                               className="block text-gray-600 text-sm font-semibold mb-2">Role</label>
                        <div
                            className="flex justify-center gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                            <div className="w-full">
                                <input type="radio" name="role" id="user" value="USER" className="peer hidden"/>
                                <label htmlFor="user"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">USER</label>
                            </div>
                            <div className="w-full">
                                <input type="radio" name="role" id="admin" value="ADMIN" className="peer hidden"/>
                                <label htmlFor="admin"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">ADMIN</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <UpdateRecordButton/>
                        <CancelButton/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserUpdateForm;