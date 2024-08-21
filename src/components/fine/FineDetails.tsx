import React from "react";

import Fine from "../../model/Fine.ts";
import useUserRole from "../../hooks/use-user-role.ts";

const FineDetails: React.FC<{ record: Fine }> = (props) => {
    const {isAdmin} = useUserRole();

    const {record: fine} = props;
    const paidAt = new Date(fine.createdAt).toISOString().split('T')[0];

    return (
        fine && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center gap-16">
                        {isAdmin() &&
                            <img
                                className="w-24 h-24 rounded-full"
                                src={fine.member?.avatar}/>
                        }
                        <img
                            className="w-auto h-28 rounded-lg"
                            src={fine.book?.cover}/>
                    </div>
                    <div
                        className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-52 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="book"
                                   className="w-full text-gray-600 font-semibold">Book</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="book"
                                type="text"
                                value={fine.book?.name}
                                disabled={true}/>
                        </div>
                        {isAdmin() &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="id"
                                       className="w-full text-gray-600 font-semibold">Member ID</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="id"
                                    type="text"
                                    value={fine.member?._id}
                                    disabled={true}/>
                            </div>
                        }
                        {isAdmin() &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="fullName"
                                       className="w-full text-gray-600 font-semibold">Member Name</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="fullName"
                                    type="text"
                                    value={fine.member?.fullName}
                                    disabled={true}/>
                            </div>
                        }
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fee"
                                   className="w-full text-gray-600 font-semibold">Fine</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fee"
                                type="number"
                                value={fine.fee.toFixed(2)}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="noOfDate"
                                   className="w-full text-gray-600 font-semibold">No of Dates</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="noOfDate"
                                type="number"
                                value={fine.noOfDate}
                                disabled={true}/>
                        </div>
                        {isAdmin() &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="handledBy"
                                       className="w-full text-gray-600 font-semibold">Handled By</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="handledBy"
                                    type="text"
                                    value={fine.librarian?.fullName}
                                    disabled={true}/>
                            </div>
                        }
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="paidAt"
                                   className="w-full text-gray-600 font-semibold">Paid Date</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="paidAt"
                                type="text"
                                value={paidAt}
                                disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default FineDetails;