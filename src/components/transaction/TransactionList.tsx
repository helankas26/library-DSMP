import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import StatusLabel from "../shared/StatusLabel.tsx";
import ViewButton from "../shared/ViewButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Transaction from "../../model/Transaction.ts";
import transactionService from "../../services/api/transaction.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const TransactionDetails = React.lazy(() => import('./TransactionDetails.tsx'));

const TransactionList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);

    const loadTransactions = useCallback(async () => {
        try {
            const response = await transactionService.findAllTransactionsWithPagination(page, size);

            const {transactions, from, to, totalCount, totalPages} = response.data;
            setTransactions(transactions);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchText]);


    const searchTransactions = useCallback(async () => {
        try {
            const response = await transactionService.findAllTransactionsBySearchWithPagination(searchText, page, size);

            const {transactions, from, to, totalCount, totalPages} = response.data;
            setTransactions(transactions);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);
            setDelay(0);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    }, [page, searchText]);

    const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setPage(1);
        setDelay(750);
    };

    const nextPageHandler = async () => {
        if (page < totalPages) {
            setPage((prevState) => prevState + 1);
        }
    };

    const prevPageHandler = async () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
        }
    };

    const transactionViewHandler = async (id: string) => {
        try {
            const response = await transactionService.findTransactionById(id);
            const {transaction} = response.data;
            return transaction;
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshTransactionsHandler = async () => {
        if (!searchText) {
            await loadTransactions();
        } else {
            await searchTransactions();
        }
    };

    const transactionDeleteHandler = async (transaction: Transaction, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            await transactionService.deleteTransaction(transaction._id);
            showAlert("Transaction deleted successfully!", "success");
            await refreshTransactionsHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadTransactions();
        }
    }, [loadTransactions]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchTransactions();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchTransactions]);

    return (
        <>
            <ContextHeader
                title={"Transactions"}
                description={"All Transactions"}
                elementRef={elementRef}
                searchTextChangeHandler={searchTextChangeHandler}
            />

            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && transactions.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No transactions were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && transactions.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Member</th>
                                <th className="px-5 py-3 font-semibold">Books</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Issued Date</th>
                                <th className="px-5 py-3 font-semibold">Due Date</th>
                                <th className="px-5 py-3 font-semibold">Returned Date</th>
                                <th className="px-5 py-3 font-semibold">Librarian</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                <th className="px-5 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {transactions.map((transaction) => {
                                const issuedAt = new Date(transaction.issuedAt).toISOString().split('T')[0];
                                const dueAt = new Date(transaction.dueAt).toISOString().split('T')[0];
                                const returnedAt = transaction.returnedAt ? new Date(transaction.returnedAt).toISOString().split('T')[0] : '-';

                                return (
                                    <tr key={transaction._id} className="border-b border-gray-200">
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{transaction.member.fullName}</p>
                                        </td>
                                        <td className="px-5 py-2 max-w-sm overflow-hidden">
                                            {transaction.books.map((book) => (
                                                <p key={book._id}
                                                   className="hover:bg-gray-200 pl-2.5 rounded text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                >
                                                    {`${book.title} ${book.edition}`}
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
                                            <p className="text-gray-900 whitespace-nowrap">{returnedAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{transaction.librarian.fullName}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <ViewButton id={transaction._id} onView={transactionViewHandler} type={"Transaction"} DetailsView={TransactionDetails}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            <DeleteButton type={"transaction"} record={transaction} onDelete={transactionDeleteHandler}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && transactions.length > 0 &&
                <PaginationBar
                    title={"transactions"}
                    style={'mt-2.5'}
                    page={page}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    from={from}
                    to={to}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            }
        </>
    );
}

export default TransactionList;