import React, {Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState} from "react";
import {Form} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

import ComboboxMultipleSelect from "../shared/ComboboxMultipleSelect.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import bookService from "../../services/api/book.ts";
import transactionService from "../../services/api/transaction.ts";
import Profile from "../../model/Profile.ts";
import Transaction from "../../model/Transaction.ts";
import Book from "../../model/Book.ts";

const SelectBook: React.FC<{
    limit: number | undefined;
    profile: Profile | null;
    setProfile: Dispatch<SetStateAction<Profile | null>>;
    books: Book[];
    setBooks: Dispatch<SetStateAction<Book[]>>
}> = (props) => {
    const {limit, profile, setProfile, books, setBooks} = props;
    const {showError, showAlert} = useSnackbar();

    const [booksList, setBooksList] = useState<Book[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const loadBooksList = useCallback(async () => {
        try {
            const response = await bookService.findAllBooks();

            const {books} = response.data;
            const sortedBooks = books.sort((a, b) => a.name.localeCompare(b.name));
            setBooksList(sortedBooks);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const booksSelectionHandler = (selectedBooks: Book[]) => {
        if (limit) {
            if (selectedBooks.length <= limit) {
                setBooks(selectedBooks);
            } else {
                showAlert(`You can only select up to ${limit} books.`, "warning");
            }
        } else {
            showAlert("First select a member to add books!", "info");
        }
    };

    const bookRemoveHandler = (book: Book) => {
        setBooks((prevState) => prevState.filter(prevBook => prevBook._id !== book._id));
    };

    const lendBooksHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (!profile) {
            showAlert("First select a member to lend books!", "info");
            return;
        }

        setIsSubmitting(true);

        const bookIds = books.map(book => book._id);
        const transaction: Transaction = {books: bookIds, member: profile._id} as unknown as Transaction;

        try {
            await transactionService.createTransaction(transaction);
            showAlert(`${!(books.length > 1) ? 'Book' : 'Books'} lent successfully!`, "success");
            setProfile(null);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        loadBooksList();
    }, [loadBooksList]);

    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl px-4 pt-2 pb-4 flex flex-col gap-2.5">
                <div className="flex">
                    <div className="w-full">
                        <h2 className="text-gray-600 font-semibold">New Loan</h2>
                        <span className="text-xs">Lend Books</span>
                    </div>
                    <div>
                        <h2 className="text-gray-600 font-semibold">Limit:</h2>
                        <h2 className="text-red-500 font-bold">{limit}</h2>
                    </div>
                </div>

                <Form className="pb-4 flex flex-col gap-2.5" onSubmit={lendBooksHandler}>
                    <div className="w-full flex justify-center">
                        <div className="w-full sm:w-2/3">
                            <label htmlFor="books"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Book</label>
                            <ComboboxMultipleSelect
                                id={"books"}
                                objects={booksList}
                                displayField={"name"}
                                selectedObjects={books}
                                setSelectedObjects={booksSelectionHandler}
                            />
                        </div>
                    </div>

                    {books &&
                        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-5">
                            {books.map((book) => (
                                <div key={book?._id}
                                     className="w-full sm:w-2/3 lg:w-1/3 bg-white p-3 rounded-xl shadow-xl border flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
                                    <div className="flex space-x-6 items-center">
                                        <img className="w-24 h-28 border rounded-md"
                                             src={book?.cover}
                                             alt={book?.name}/>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-gray-900 font-semibold text-base leading-none">{book?.title}</p>
                                                <p className="text-gray-500 font-normal text-sm">{book?.edition}</p>
                                            </div>
                                            <p className="bg-gray-200 px-2 text-center rounded font-semibold text-sm text-gray-900">#{book?._id}</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 items-center">
                                        <button
                                            className="bg-gray-300 rounded-md py-2 px-1 flex items-center transition duration-150 hover:bg-gray-400 active:bg-gray-300 shadow focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => bookRemoveHandler(book)}>
                                            <CloseIcon fontSize="small" className="text-gray-900"/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <div className="w-full mt-4">
                        <button
                            className="w-full py-2 px-4 font-semibold text-white rounded shadow transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
                            type="submit"
                            disabled={isSubmitting}>
                            {!isSubmitting && (`Lend ${!(books.length > 1) ? 'Book' : 'Books'}`)}
                            {isSubmitting && 'Lending . . .'}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default SelectBook;