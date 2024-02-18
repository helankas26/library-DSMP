import React from "react";
import StatusLabel from "../shared/StatusLabel.tsx";

const AvailableReservations: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl flex flex-col gap-1">
                <div className="w-full p-2">
                    <h2 className="text-gray-600 font-semibold">Reservations</h2>
                    <span className="text-xs">Available for borrow</span>
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
                                        Reserved Date
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold">
                                        Due Date
                                    </th>
                                    <th
                                        className="px-5 py-3 font-semibold text-center">
                                        Options
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white text-sm">
                                <tr className="border-b border-gray-200">
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">Head First Java</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <StatusLabel status={'BORROWED'}/>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">2024-02-12</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">2024-02-12</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                className="w-[100px] py-2 px-4 font-semibold text-white transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 leading-tight rounded shadow"
                                                type="submit">
                                                Add
                                            </button>
                                            <button
                                                className="w-[100px] py-2 px-4 font-semibold text-white transition duration-150 bg-amber-600 hover:bg-amber-700 active:bg-amber-600 leading-tight rounded shadow"
                                                type="submit">
                                                Cancel
                                            </button>
                                        </div>
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

export default AvailableReservations;