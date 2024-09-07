import React, {useCallback, useEffect, useState} from "react";

import OverdueDatesLabel from "../../shared/OverdueDatesLabel.tsx";
import useSnackbar from "../../../hooks/use-snackbar.ts";
import useUserRole from "../../../hooks/use-user-role.ts";
import Transaction from "../../../model/Transaction.ts";
import transactionService from "../../../services/api/transaction.ts";
import GradientCircularProgress from "../../shared/GradientCircularProgress.tsx";

const TransactionCard: React.FC = () => {
    const {showError} = useSnackbar();
    const {userRole, isAdmin, isUser} = useUserRole();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadTransactions = useCallback(async () => {
        try {
            const response = await transactionService.findAllOverdue();

            const {transactions} = response.data;
            setTransactions(transactions);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]);

    const getMinWidthClass = () => {
        if (isAdmin()) return 'min-w-[660px]';
        if (isUser()) return 'min-w-[440px]';
        return '';
    };

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    return (
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="mb-4 border-b border-gray-200">
                <p className="font-medium">Transaction Overdue</p>
            </div>

            {isLoading &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <GradientCircularProgress/>
                </div>
            }

            {!isLoading && transactions.length === 0 &&
                <div className="-mt-4 w-full h-[300px] flex justify-center items-center">
                    <p className="text-lg font-medium bg-amber-300 text-white w-4/5 px-3 py-2 rounded-sm border-l-8 border-l-amber-500">
                        No Overdue
                    </p>
                </div>
            }

            {!isLoading && transactions.length > 0 &&
                <div className="overflow-x-auto h-[300px]">
                    <table className={`w-full ${getMinWidthClass()}`}>
                        <thead>
                            <tr className="text-[12px] uppercase tracking-wide text-gray-400 bg-gray-50 text-left">
                                {isAdmin() &&
                                    <th className="font-medium py-2 px-4 rounded-tl-md rounded-bl-md">Profile</th>
                                }
                                <th className="font-medium py-2 px-6">Book</th>
                                <th className="font-medium py-2 px-4 rounded-tr-md rounded-br-md">Overdue dates</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id} className="border-b border-b-gray-100">
                                    {isAdmin() &&
                                        <td className="py-2 px-4">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-full object-cover block"
                                                     src={transaction.member.avatar}
                                                     alt={transaction.member.fullName}/>
                                                <p className="text-gray-600 text-sm font-medium ml-2 truncate">
                                                    {transaction.member.fullName}
                                                </p>
                                            </div>
                                        </td>
                                    }
                                    <td className="py-2 px-4">
                                        {transaction.books.map((book) => (
                                            <p key={book._id}
                                               className="text-[13px] hover:bg-gray-100 pl-2.5 rounded font-medium text-gray-500"
                                            >
                                                {book.name}
                                            </p>
                                        ))}
                                    </td>
                                    <td className="py-2 px-4">
                                        <p className="text-[13px] font-medium text-gray-500">
                                            <OverdueDatesLabel lateDates={transaction.noOfDate}/>
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default TransactionCard;