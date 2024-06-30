import React from "react";

import Transaction from "../../model/Transaction.ts";

const TransactionDetails: React.FC<{ record: Transaction }> = (props) => {
    const {record: transaction} = props;
    const issuedAt = new Date(transaction.issuedAt).toISOString().split('T')[0];
    const dueAt = new Date(transaction.dueAt).toISOString().split('T')[0];
    const returnedAt = transaction.returnedAt ? new Date(transaction.returnedAt).toISOString().split('T')[0] : undefined;

    return (
        transaction && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center">
                        <img
                            className="w-auto h-32 rounded-lg"
                            src={transaction.member?.avatar}/>
                    </div>
                    <div
                        className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-52 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="id"
                                   className="w-full text-gray-600 font-semibold">ID</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="id"
                                type="text"
                                value={transaction._id}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fullName"
                                   className="w-full text-gray-600 font-semibold">Full Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                value={transaction.member?.fullName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="books"
                                   className="w-full text-gray-600 font-semibold">Books</label>
                            <div className="w-full flex flex-col gap-2">
                                {transaction.books.length === 0 &&
                                    <p className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">Not
                                        available</p>
                                }

                                {transaction.books.map((book) => (
                                    <p key={book._id}
                                       className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">{book.name}</p>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="status"
                                   className="w-full text-gray-600 font-semibold">Status</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="status"
                                type="text"
                                value={transaction.status}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="issuedAt"
                                   className="w-full text-gray-600 font-semibold">Issued Date</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="issuedAt"
                                type="text"
                                value={issuedAt}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="dueAt"
                                   className="w-full text-gray-600 font-semibold">Due Date</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="dueAt"
                                type="text"
                                value={dueAt}
                                disabled={true}/>
                        </div>
                        {returnedAt &&
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor="returnedAt"
                                       className="w-full text-gray-600 font-semibold">Returned Date</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="returnedAt"
                                    type="text"
                                    value={returnedAt}
                                    disabled={true}/>
                            </div>
                        }
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="handledBy"
                                   className="w-full text-gray-600 font-semibold">Handled By</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="handledBy"
                                type="text"
                                value={transaction.librarian?.fullName}
                                disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default TransactionDetails;