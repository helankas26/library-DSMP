import React, {useCallback, useEffect, useState} from "react";

import BookShowcaseItem from "./BookShowcaseItem.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Book from "../../model/Book.ts";
import bookService from "../../services/api/book.ts";

const BookShowcase: React.FC = () => {
    const size: number = 12;
    const scrollToTop = useScrollToTop();
    const {showError} = useSnackbar();

    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);

    const loadShowcaseBooks = useCallback(async () => {
        try {
            const response = await bookService.findAllBooksWithPagination(page, size);
            setBooks(response.data.books);
            setTotalCount(response.data.totalCount);
            setTotalPages(response.data.totalPages);
            setFrom(response.data.from);
            setTo(response.data.to);
        } catch (error: any) {
            showError(error);
        }

        scrollToTop();
    }, [page]);

    const onLoadShowcaseBooks = useCallback(async () => {
        await loadShowcaseBooks();
    }, [loadShowcaseBooks]);

    const nextShowcaseBooks = async () => {
        if (page < totalPages) {
            setPage(prevState => prevState + 1);
            await loadShowcaseBooks();
        }
    };

    const prevShowcaseBooks = async () => {
        if (page > 1) {
            setPage(prevState => prevState - 1);
            await loadShowcaseBooks();
        }
    };

    useEffect(() => {
        onLoadShowcaseBooks();
    }, [onLoadShowcaseBooks]);

    return (
        <div className="flex justify-center lg:justify-normal gap-x-12 gap-y-6 flex-wrap">
            {books.length === 0 &&
                <div className="w-full h-[55vh] flex justify-center items-center">
                    <p className="text-2xl font-medium text-blue-600">No books were found.</p>
                </div>
            }

            {books.length > 0 &&
                <>
                    {books.map((book) => (
                        <BookShowcaseItem key={book._id} book={book}/>
                    ))}

                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden mt-6 mb-5">
                        <div className="px-5 py-5 bg-white rounded-lg flex flex-col items-center">
                            <span className="text-xs sm:text-sm text-gray-900">
                                Showing {from} to {to} of {totalCount} books
                            </span>
                            <div className="inline-flex mt-2 gap-3">
                                <button
                                    disabled={page <= 1}
                                    onClick={prevShowcaseBooks}
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-l disabled:bg-gray-500">
                                    Prev
                                </button>
                                <button
                                    disabled={page >= totalPages}
                                    onClick={nextShowcaseBooks}
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-r disabled:bg-gray-500">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    );
}

export default BookShowcase;