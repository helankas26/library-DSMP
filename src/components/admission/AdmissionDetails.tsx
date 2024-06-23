import React from "react";

import Admission from "../../model/Admission.ts";

const AdmissionDetails: React.FC<{ record: Admission }> = (props) => {
    const {record: admission} = props;
    const paidAt = new Date(admission.createdAt).toISOString().split('T')[0];

    return (
        admission && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center">
                        <img
                            className="w-auto h-36 rounded-lg"
                            src={admission.member?.avatar}/>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-52 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="id"
                                   className="w-full text-gray-600 font-semibold">ID</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="id"
                                type="text"
                                value={admission.member?._id}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fullName"
                                   className="w-full text-gray-600 font-semibold">Full Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                value={admission.member?.fullName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fee"
                                   className="w-full text-gray-600 font-semibold">Fee</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fee"
                                type="number"
                                value={admission.fee!.toFixed(2)}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="handledBy"
                                   className="w-full text-gray-600 font-semibold">Handled By</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="handledBy"
                                type="text"
                                value={admission.librarian?.fullName}
                                disabled={true}/>
                        </div>
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

export default AdmissionDetails;