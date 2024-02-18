import React from "react";
import ComboboxSingleSelect from "../shared/ComboboxSingleSelect.tsx";
import CloseIcon from '@mui/icons-material/Close';

const SelectProfile: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-1">
                <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
                    <div className="w-full">
                        <label htmlFor="byId"
                               className="block text-gray-600 text-sm font-semibold mb-2">Reg No.</label>
                        <input type="search" id="byId" placeholder="Search by Reg No."
                               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="byName"
                               className="block text-gray-600 text-sm font-semibold mb-2">By Name</label>
                        <ComboboxSingleSelect objects={[]} displayField={"fullName"}/>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div
                        className="w-full sm:w-2/3 lg:w-1/3 bg-white p-3 rounded-xl shadow-xl border flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
                        <div className="flex space-x-6 items-center">
                            <img src="https://avatars.githubusercontent.com/u/61771292?v=4"
                                 className="w-auto h-24 rounded-lg"/>
                            <div>
                                <p className="text-gray-900 font-semibold text-base">Helanka Singhapurage</p>
                                <p className="bg-gray-200 px-2 text-center rounded font-semibold text-sm text-gray-900">#972701564</p>
                            </div>
                        </div>

                        <div className="flex space-x-2 items-center">
                            <button
                                className="bg-gray-300 rounded-md py-2 px-1 flex items-center transition duration-150 hover:bg-gray-400 active:bg-gray-300">
                                <CloseIcon fontSize="small" className="text-gray-900"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectProfile;