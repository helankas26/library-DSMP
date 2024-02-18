import React from "react";
import StatusLabel from "../shared/StatusLabel.tsx";
import OverdueDatesLabel from "../shared/OverdueDatesLabel.tsx";
import FinePayModal from "../fine/FinePayModal.tsx";

const CurrentLoans: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl flex flex-col gap-1">
                <div className="w-full p-2">
                    <h2 className="text-gray-600 font-semibold">Current Loans</h2>
                    <span className="text-xs">Lent Books</span>
                </div>

                <div
                    className="pb-1 overflow-x-auto">
                    <div
                        className="inline-block min-w-full rounded-lg overflow-hidden border-t border-x border-gray-200">
                        <table className="min-w-full leading-normal">
                            <thead
                                className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Book
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Status
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Issued Date
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Due Date
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Late Dates
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Option
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white text-sm">
                                <tr className="border-b border-gray-200">
                                    <td className="px-5 py-1">
                                        <p className="hover:bg-gray-100 rounded text-gray-900 whitespace-nowrap">Head First
                                            Java</p>
                                        <p className="hover:bg-gray-100 rounded text-gray-900 whitespace-nowrap">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        </p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <StatusLabel status={'OVERDUE'}/>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">2024-02-12</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">2024-02-12</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <OverdueDatesLabel lateDates={3}/>
                                    </td>
                                    <td className="px-5 py-1">
                                        <FinePayModal/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentLoans;