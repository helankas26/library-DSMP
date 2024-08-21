import React from "react";

import Subscription from "../../model/Subscription.ts";
import useUserRole from "../../hooks/use-user-role.ts";

const PaymentDetails: React.FC<{ record: Subscription }> = (props) => {
    const {isAdmin} = useUserRole();

    const {record: subscription} = props;
    const paidAt = new Date(subscription.paidAt).toISOString().split('T')[0];
    const updateAt = subscription.updateAt ? new Date(subscription.updateAt).toISOString().split('T')[0] : undefined;

    return (
        subscription && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    {isAdmin() &&
                        <div className="flex justify-center">
                            <img
                                className="w-auto h-36 rounded-lg"
                                src={subscription.member?.avatar}/>
                        </div>
                    }
                    <div
                        className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-52 overflow-auto">
                        {isAdmin() &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="id"
                                       className="w-full text-gray-600 font-semibold">ID</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="id"
                                    type="text"
                                    value={subscription.member?._id}
                                    disabled={true}/>
                            </div>
                        }
                        {isAdmin() &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="fullName"
                                       className="w-full text-gray-600 font-semibold">Full Name</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="fullName"
                                    type="text"
                                    value={subscription.member?.fullName}
                                    disabled={true}/>
                            </div>
                        }
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fee"
                                   className="w-full text-gray-600 font-semibold">Fee</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fee"
                                type="number"
                                value={subscription.fee.toFixed(2)}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="paidFor"
                                   className="w-full text-gray-600 font-semibold">Paid For</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="paidFor"
                                type="text"
                                value={subscription.paidFor}
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
                                    value={subscription.librarian?.fullName}
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
                        {updateAt &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="updateAt"
                                       className="w-full text-gray-600 font-semibold">Update Date</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="updateAt"
                                    type="text"
                                    value={updateAt}
                                    disabled={true}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    );
}

export default PaymentDetails;