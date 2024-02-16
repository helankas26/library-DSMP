import React from "react";
import SaveRecordButton from "../shared/SaveRecordButton.tsx";

const AuthorCreateForm: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
                <div className="w-full">
                    <label htmlFor="name"
                           className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
                    <input type="text" id="name" placeholder="Enter author name"
                           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                </div>
                <SaveRecordButton model={'Author'}/>
            </div>
        </div>
    );
}

export default AuthorCreateForm;