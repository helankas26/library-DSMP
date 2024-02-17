import React from "react";
import SaveRecordButton from "../shared/SaveRecordButton.tsx";

const ProfileNew: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex justify-center">
                    <div className="flex-shrink-0 w-36 h-36">
                        <img className="w-full h-full border rounded-full"
                             src="https://avatars.githubusercontent.com/u/61771292?v=4"
                             alt=""/>
                    </div>
                </div>

                <div
                    className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-evenly flex-wrap lg:flex-nowrap">
                    <div className="font-[sans-serif] w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                        <label className="text-sm text-black mb-2 block">Upload Avatar</label>
                        <input type="file"
                               accept="image/jpeg, image/png"
                               className="w-full text-black text-sm bg-white border border-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"/>
                        <p className="text-xs text-gray-400 mt-2">JPEG, JPG and PNG are Allowed.</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                        <label htmlFor="fullName"
                               className="block text-gray-600 text-sm font-semibold mb-2">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter full name"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                        <label htmlFor="telNo"
                               className="block text-gray-600 text-sm font-semibold mb-2">Telephone No</label>
                        <input type="tel" id="telNo" placeholder="Enter telephone no"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 items-center md:justify-evenly">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                        <label htmlFor="email"
                               className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                        <input type="email" id="email" placeholder="Enter email"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                        <label htmlFor="type"
                               className="block text-gray-600 text-sm font-semibold mb-2">Type</label>
                        <div
                            className="flex justify-center gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                            <div className="w-full">
                                <input type="radio" name="type" id="member" value="MEMBER" className="peer hidden"
                                       checked/>
                                <label htmlFor="member"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">MEMBER</label>
                            </div>
                            <div className="w-full">
                                <input type="radio" name="type" id="librarian" value="LIBRARIAN"
                                       className="peer hidden"/>
                                <label htmlFor="librarian"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">LIBRARIAN</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full">
                        <label htmlFor="address"
                               className="block text-gray-600 text-sm font-semibold mb-2">Address</label>
                        <textarea id="address"
                                  className="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                  placeholder="Address here..."/>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full flex gap-5">
                        <SaveRecordButton model={'Profile'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileNew;