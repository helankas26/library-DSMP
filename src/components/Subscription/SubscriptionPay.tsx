import React from "react";
import PaymentStatusLabel from "../shared/PaymentStatusLabel.tsx";
import PayButton from "../shared/PayButton.tsx";

const SubscriptionPay: React.FC = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Subscriptions</h2>
                    <span className="text-xs">Payments</span>
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
                                    className="pl-5 pr-2 py-3 font-semibold">
                                    Profile
                                </th>
                                <th
                                    className="pl-5 pr-2 py-3 font-semibold">
                                    Payment Status
                                </th>
                                <th
                                    className="pl-5 pr-2 py-3 font-semibold">
                                    Fee
                                </th>
                                <th
                                    className="pl-5 pr-2 py-3 font-semibold">
                                    Total Amount
                                </th>
                                <th
                                    className="pl-5 pr-2 py-3 font-semibold">
                                    Pay Option
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            <tr className="border-b border-gray-200">
                                <td className="pl-5 pr-2 py-1">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-14 h-14">
                                            <img className="w-full h-full border rounded-full"
                                                 src="https://avatars.githubusercontent.com/u/61771292?v=4"
                                                 alt=""/>
                                        </div>
                                        <div className="ml-3">
                                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900 whitespace-nowrap">#972701564</p>
                                            <p className="text-gray-900 whitespace-nowrap">Helanka Singhapurage</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-5 pr-2 py-1">
                                    <PaymentStatusLabel paymentStatus={2}/>
                                </td>
                                <td className="pl-5 pr-2 py-1">
                                    <p className="text-gray-900 whitespace-nowrap">300.00</p>
                                </td>
                                <td className="pl-5 pr-2 py-1 max-w-xs overflow-hidden">
                                    <p className="text-gray-900 whitespace-nowrap">600.00</p>
                                </td>
                                <td className="px-5 py-1">
                                    <PayButton/>
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

export default SubscriptionPay;