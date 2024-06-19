import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Book from "../../model/Book.ts";
import bookService from "../../services/api/book.ts";
import bookFirebaseService from "../../services/firebase/book.ts";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";
import ContextHeader from "../shared/ContextHeader.tsx";

const BookDetails = React.lazy(() => import('./BookDetails.tsx'));

const BookList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const navigate = useNavigate();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);

    const loadBooks = useCallback(async () => {
        try {
            const response = await bookService.findAllBooksWithPagination(page, size);

            const {books, from, to, totalCount, totalPages} = response.data;
            setBooks(books);
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


    const searchBooks = useCallback(async () => {
        try {
            const response = await bookService.findAllBooksBySearchWithPagination(searchText, page, size);

            const {books, from, to, totalCount, totalPages} = response.data;
            setBooks(books);
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

    const bookViewHandler = async (id: string) => {
        try {
            const response = await bookService.findBookById(id);
            const {book} = response.data;
            return book;
        } catch (error: any) {
            showError(error);
        }
    };

    const bookUpdateHandler = (id: string) => {
        navigate(`${id}/edit`);
    };

    const bookDeleteHandler = async (book: Book, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            await bookService.deleteBook(book._id);
            await bookFirebaseService.deleteBookImage(book.cover);
            showAlert("Book deleted successfully!", "success");

            if (!searchText) {
                await loadBooks();
            } else {
                await searchBooks();
            }

            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadBooks();
        }
    }, [loadBooks]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchBooks();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchBooks]);

    return (
        <>
            <ContextHeader
                title={"Books"}
                description={"All Book items"}
                elementRef={elementRef}
                searchTextChangeHandler={searchTextChangeHandler}
            />


            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && books.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No books were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && books.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Title</th>
                                <th className="px-5 py-3 font-semibold">Edition</th>
                                <th className="px-5 py-3 font-semibold">Description</th>
                                <th className="px-5 py-3 font-semibold">No of Copies</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                <th className="px-5 py-3 font-semibold">Update Option</th>
                                <th className="px-5 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {books.map((book) => (
                                <tr key={book._id} className="border-b border-gray-200">
                                    <td className="px-5 py-1">
                                        <div className="flex flex-col lg:flex-row items-center">
                                            <div className="flex-shrink-0 w-20 h-24">
                                                <img className="w-full h-full border rounded-md"
                                                     src={book.cover}
                                                     alt={`${book.title} ${book.edition}`}/>
                                            </div>
                                            <div className="mt-1 lg:mt-0 lg:ml-3">
                                                <p className="text-gray-900 whitespace-nowrap">{book.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">{book.edition}</p>
                                    </td>
                                    <td className="px-5 py-1 max-w-xs overflow-hidden">
                                        <p className="text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">{book.description}</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <p className="text-gray-900 whitespace-nowrap">{book.noOfCopies}</p>
                                    </td>
                                    <td className="px-5 py-1">
                                        <ViewButton id={book._id} onView={bookViewHandler} type={"Book"} DetailsView={BookDetails}/>
                                    </td>
                                    <td className="px-5 py-1">
                                        <UpdateButton id={book._id} onUpdate={bookUpdateHandler}/>
                                    </td>
                                    <td className="px-5 py-1">
                                        <DeleteButton type={"book"} record={book} onDelete={bookDeleteHandler}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && books.length > 0 &&
                <PaginationBar
                    title={"books"}
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

export default BookList;