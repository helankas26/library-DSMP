import React, {FormEvent, useState} from "react";
import {Form} from "react-router-dom";

import PayButton from "../shared/PayButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import fineService from "../../services/api/fine.ts";
import Fine from "../../model/Fine.ts";
import TransactionWithFine from "../../model/TransactionWithFine.ts";

const FinePayment: React.FC<{
    record: TransactionWithFine;
    onClose: () => Promise<void>
}> = (props) => {
    const {record: transaction, onClose} = props;
    const {showError, showAlert} = useSnackbar();

    const [isPaying, setIsPaying] = useState<boolean>(false);

    const paymentHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsPaying(true);

        try {
            const finesArray: Fine[] = transaction.books.map((book) => {
                return {
                    fee: book.fine,
                    member: transaction.member._id,
                    book: book._id,
                    noOfDate: transaction.noOfDate
                } as unknown as Fine;
            });

            const fines = {
                fines: finesArray,
                transactionId: transaction._id,
            } as unknown as Fine;

            await fineService.createFine(fines);
            showAlert('Fine paid successfully!', "success");

            setTimeout(() => onClose(), 50);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsPaying(false);
        }
    };

    return (
        transaction && (
            <div className="min-w-full border rounded mb-4">
                <div className="m-4 pb-1 overflow-x-auto">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                            <img className="w-full h-full border rounded-full"
                                 src={transaction.member.avatar}
                                 alt={transaction.member.fullName}/>
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{transaction.member._id}</p>
                            <p className="text-gray-900">{transaction.member.fullName}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col border rounded-lg">
                        {transaction.books.map((book) => (
                            <div key={book._id} className="py-3 px-4 text-sm text-gray-800 border-b w-full">
                                <div className="flex items-center justify-between w-full">
                                    <div>{book.name}</div>
                                    <div>LKR {book.fine}</div>
                                </div>
                            </div>
                        ))}
                        <div className="py-3 px-4 text-sm font-semibold bg-gray-50 text-gray-800 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div>Total Amount</div>
                                <div>LKR {transaction.totalAmount}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div className="mr-4">
                        <Form onSubmit={paymentHandler}>
                            <PayButton isPaying={isPaying}/>
                        </Form>
                    </div>
                </div>
            </div>
        )
    );
}

export default FinePayment;