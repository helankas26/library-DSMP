import React from "react";
import OverdueDatesLabel from "../../shared/OverdueDatesLabel.tsx";

const TransactionCard: React.FC = () => {
    return (
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="mb-4 border-b border-gray-200">
                <p className="font-medium">Transaction Overdue</p>
            </div>
            <div className="overflow-x-auto h-[300px]">
                <table className="w-full min-w-[660px]">
                    <thead>
                        <tr>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Profile</th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Book</th>
                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Overdue
                                dates
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <div className="flex items-center">
                                    <img src="https://avatars.githubusercontent.com/u/61771292?v=4" alt=""
                                         className="w-8 h-8 rounded-full object-cover block"/>
                                    <p className="text-gray-600 text-sm font-medium ml-2 truncate">
                                        Helanka Singhapurage
                                    </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <p className="text-[13px] hover:bg-gray-100 rounded font-medium text-gray-500">
                                    System Design Edition v2
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <p className="text-[13px] font-medium text-gray-500">
                                    <OverdueDatesLabel lateDates={1}/>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <div className="flex items-center">
                                    <img src="https://avatars.githubusercontent.com/u/61771292?v=4" alt=""
                                         className="w-8 h-8 rounded-full object-cover block"/>
                                    <p className="text-gray-600 text-sm font-medium ml-2 truncate">
                                        Helanka Singhapurage
                                    </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <p className="text-[13px] hover:bg-gray-100 rounded font-medium text-gray-500">Head First
                                    Java</p>
                                <p className="text-[13px] hover:bg-gray-100 rounded font-medium text-gray-500">
                                    System Design Edition v2
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                                <p className="text-[13px] font-medium text-gray-500">
                                    <OverdueDatesLabel lateDates={3}/>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionCard;