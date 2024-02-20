import React from "react";
import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";

const ReservationUpdateForm: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
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

                    <div className="flex items-center justify-center">
                        <div className="flex justify-center">
                            <div className="flex-shrink-0 w-14 h-16">
                                <img className="w-full h-full border rounded-md"
                                     src="https://m.media-amazon.com/images/I/81wAshyxQyL._AC_UF1000,1000_QL80_.jpg"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#2132483321</p>
                            <p className="text-gray-900">Head First Java</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-5 sm:gap-10">
                    <div className="w-full">
                        <label htmlFor="status"
                               className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
                        <div
                            className="flex justify-center gap-0 sm:gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                            <div className="w-full">
                                <input type="radio" name="type" id="reserved" value="RESERVED"
                                       className="peer hidden"/>
                                <label htmlFor="reserved"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-blue-600 peer-checked:font-semibold peer-checked:text-white">RESERVED</label>
                            </div>
                            <div className="w-full">
                                <input type="radio" name="type" id="borrowed" value="BORROWED"
                                       className="peer hidden"/>
                                <label htmlFor="borrowed"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">BORROWED</label>
                            </div>
                            <div className="w-full">
                                <input type="radio" name="type" id="cancelled" value="CANCELLED"
                                       className="peer hidden"/>
                                <label htmlFor="cancelled"
                                       className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">CANCELLED</label>
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

export default ReservationUpdateForm;