import React from "react";
import SaveRecordButton from "../shared/SaveRecordButton.tsx";

const CategoryCreateForm: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
                    <div className="w-full">
                        <label htmlFor="name"
                               className="block text-gray-600 text-sm font-semibold mb-2">Category Name</label>
                        <input type="text" id="name" placeholder="Enter category name"
                               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="description"
                               className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                        <input type="text" id="description" placeholder="Enter description"
                               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                <SaveRecordButton model={'Category'}/>
            </div>
        </div>
    );
}

export default CategoryCreateForm;