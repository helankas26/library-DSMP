import React, {FormEvent, useState} from "react";
import {Form} from "react-router-dom";

import StatusLabel from "../shared/StatusLabel.tsx";
import OverdueDatesLabel from "../shared/OverdueDatesLabel.tsx";
import PaymentButton from "../shared/PaymentButton.tsx";
import ReturnButton from "../shared/ReturnButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import transactionService from "../../services/api/transaction.ts";
import Transaction from "../../model/Transaction.ts";
import Profile from "../../model/Profile.ts";
import TransactionStatus from "../../enum/TransactionStatus.ts";

const FinePayment = React.lazy(() => import('../fine/FinePayment.tsx'));

const CurrentLoans: React.FC<{
    transactions: Transaction[];
    profile: Profile;
    fetchProfile: (id: string) => Promise<void>
}> = (props) => {
    const {transactions, profile, fetchProfile} = props;
    const {showError, showAlert} = useSnackbar();

    const [isReturning, setIsReturning] = useState<boolean>(false);

    const returnTransactionHandler = async (event: FormEvent, id: string) => {
        event.preventDefault();

        setIsReturning(true);

        const editedTransaction: Transaction = {status: TransactionStatus.Returned} as Transaction;

        try {
            await transactionService.updateTransaction(id, editedTransaction);
            showAlert("Return successfully!", "success");
            await fetchProfile(profile._id);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsReturning(false);
        }
    };

    const transactionFineHandler = async (id: string) => {
        try {
            const response = await transactionService.getTransactionFineDetailsById(id);
            const {transaction} = response.data;
            return transaction;
        } catch (error: any) {
            showError(error);
        }
    };

    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl px-4 pt-2 pb-4 flex flex-col gap-2.5">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Current Loans</h2>
                    <span className="text-xs">Lent Books</span>
                </div>

                <div className="min-w-full shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead
                            className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Book</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Issued Date</th>
                                <th className="px-5 py-3 font-semibold">Due Date</th>
                                <th className="px-5 py-3 font-semibold">Late Dates</th>
                                <th className="px-5 py-3 font-semibold">Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {transactions.map((transaction) => {
                                const issuedAt = new Date(transaction.issuedAt).toISOString().split('T')[0];
                                const dueAt = new Date(transaction.dueAt).toISOString().split('T')[0];

                                return (
                                    <tr key={transaction._id} className="border-b border-gray-200">
                                        <td className="px-5 py-2">
                                            {transaction.books.map((book) => (
                                                <p className="hover:bg-gray-200 pl-2.5 rounded text-gray-900 whitespace-nowrap"
                                                   key={book._id}>
                                                    {book.name}
                                                </p>
                                            ))}
                                        </td>
                                        <td className="px-5 py-2">
                                            <StatusLabel status={transaction.status}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{issuedAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{dueAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <OverdueDatesLabel lateDates={transaction.noOfDate}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            {transaction.status === TransactionStatus.Overdue && transaction.noOfDate &&
                                                <PaymentButton
                                                    id={transaction._id}
                                                    onPayment={transactionFineHandler}
                                                    type={"Fine"}
                                                    PaymentDetails={FinePayment}
                                                    onRefreshPayment={async () => {
                                                        await fetchProfile(profile._id)
                                                    }}
                                                />
                                            }

                                            {transaction.status === TransactionStatus.Borrowed && !transaction.noOfDate &&
                                                <Form
                                                    onSubmit={(event: FormEvent) => returnTransactionHandler(event, transaction._id)}>
                                                    <ReturnButton isReturning={isReturning}/>
                                                </Form>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CurrentLoans;