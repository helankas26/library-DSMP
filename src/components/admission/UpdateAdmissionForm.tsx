import React from "react";
import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";

const UpdateAdmissionForm: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-14 h-14">
                        <img className="w-full h-full border rounded-full"
                             src="https://avatars.githubusercontent.com/u/61771292?v=4"
                             alt=""/>
                    </div>
                    <div className="ml-3 ">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#972701564</p>
                        <p className="text-gray-900">Helanka Singhapurage</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
                    <div className="w-full">
                        <label htmlFor="name"
                               className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
                        <input type="text" id="name" placeholder="Enter author name"
                               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
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

export default UpdateAdmissionForm;