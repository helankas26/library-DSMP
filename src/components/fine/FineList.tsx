import React from "react";

const FineList: React.FC = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Fines</h2>
                    <span className="text-xs">All Fine</span>
                </div>
                <div className="w-full flex bg-gray-50 items-center p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"/>
                    </svg>
                    <input className="bg-gray-50 outline-none ml-1 block w-full" type="search"
                           placeholder="search..."/>
                </div>
            </div>
            <div
                className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-1 sm:py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead
                            className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Member
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Fee
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Book
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    No of Dates
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Paid Date
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Librarian
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    View Option
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Update Option
                                </th>
                                <th
                                    className="px-5 py-3 font-semibold">
                                    Delete Option
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            <tr className="border-b border-gray-200">
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">Heshanka</p>
                                </td>
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">300.00</p>
                                </td>
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">Head First Java</p>
                                </td>
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">7</p>
                                </td>
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">2024-02-12</p>
                                </td>
                                <td className="px-5 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">Helanka</p>
                                </td>
                                <td className="px-5 py-1">
                                    <button
                                        className="px-4 py-2 font-semibold text-green-900 transition duration-150 bg-green-100 hover:bg-green-200 active:bg-green-300 active:bg-opacity-75 leading-tight rounded shadow">
                                        View
                                    </button>
                                </td>
                                <td className="px-5 py-1">
                                    <button
                                        className="px-4 py-2 font-semibold text-orange-900 transition duration-150 bg-orange-100 hover:bg-orange-200 active:bg-orange-300 active:bg-opacity-75 leading-tight rounded shadow">
                                        Update
                                    </button>
                                </td>
                                <td className="px-5 py-1">
                                    <button
                                        className="px-4 py-2 font-semibold text-red-900 transition duration-150 bg-red-100 hover:bg-red-200 active:bg-red-300 active:bg-opacity-75 leading-tight rounded shadow">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        className="px-5 py-5 bg-white border-t flex flex-col items-center">
                                <span className="text-xs sm:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                        <div className="inline-flex mt-2 gap-3">
                            <button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FineList;