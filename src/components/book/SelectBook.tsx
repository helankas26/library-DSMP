import React from "react";
import ComboboxSingleSelect from "../shared/ComboboxSingleSelect.tsx";
import CloseIcon from '@mui/icons-material/Close';

const SelectBook: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl px-4 pt-2 pb-4 flex flex-col gap-1">
                <div className="flex">
                    <div className="w-full -mx-2">
                        <h2 className="text-gray-600 font-semibold">New Loan</h2>
                        <span className="text-xs">Lend Books</span>
                    </div>
                    <h2 className="text-gray-600 font-semibold">Limit: <span
                        className="text-red-500 font-bold">1</span>
                    </h2>
                </div>

                <div className="w-full flex justify-center">
                    <div className="w-full sm:w-2/3">
                        <label htmlFor="byName"
                               className="block text-gray-600 text-sm font-semibold mb-2">Book</label>
                        <ComboboxSingleSelect objects={[]} displayField={"fullName"}/>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-5">
                    <div
                        className="w-full sm:w-2/3 lg:w-1/3 bg-white p-3 rounded-xl shadow-xl border flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
                        <div className="flex space-x-6 items-center">
                            <img src="https://m.media-amazon.com/images/I/81wAshyxQyL._AC_UF1000,1000_QL80_.jpg"
                                 className="w-24 h-28 border rounded-md"/>
                            <div>
                                <p className="text-gray-900 font-semibold text-base">System Design</p>
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

                <div className="w-full mt-4">
                    <button
                        className="w-full py-2 px-4 font-semibold text-white rounded shadow border border-blue-500 transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500"
                        type="submit">
                        Lend Book
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectBook;