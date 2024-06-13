import React, {useCallback, useEffect, useState} from "react";

import BookShowcaseItem from "./BookShowcaseItem.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Book from "../../model/Book.ts";
import bookService from "../../services/api/book.ts";
import categoryService from "../../services/api/category.ts";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import useHomeState from "../../hooks/use-home-state.ts";
import PaginationBar from "../shared/PaginationBar.tsx";

const BookShowcase: React.FC = () => {
    const size: number = 12;
    const {scrollToTop} = useScrollToTop();
    const {showError} = useSnackbar();
    const {page, setPage, selectedCategoryId, searchText} = useHomeState();

    const [books, setBooks] = useState<Book[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadShowcaseBooks = useCallback(async () => {
        setIsLoading(true);

        try {
            let response;

            if (selectedCategoryId) {
                response = await categoryService.findAllBooksWithPaginationById(selectedCategoryId, page, size);
            } else if (searchText) {
                response = await bookService.findAllBooksBySearchWithPagination(searchText, page, size);
            } else {
                response = await bookService.findAllBooksWithPagination(page, size);
            }

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
    }, [page, selectedCategoryId, searchText]);

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

    useEffect(() => {
        loadShowcaseBooks();
    }, [loadShowcaseBooks]);

    return (
        <div className="flex justify-center lg:justify-normal gap-x-12 gap-y-6 flex-wrap">

            {isLoading &&
                <div className="w-full h-[55vh] flex justify-center items-center">
                    <GradientCircularProgress/>
                </div>
            }

            {!isLoading && books.length === 0 &&
                <div className="w-full h-[55vh] flex justify-center items-center">
                    <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                        No books were found matching your selection.
                    </p>
                </div>
            }

            {!isLoading && books.length > 0 &&
                <>
                    {books.map((book) => (
                        <BookShowcaseItem key={book._id} book={book}/>
                    ))}

                    <PaginationBar
                        title={"books"}
                        style={'mt-6 mb-5'}
                        page={page}
                        totalCount={totalCount}
                        totalPages={totalPages}
                        from={from}
                        to={to}
                        prevPageHandler={prevPageHandler}
                        nextPageHandler={nextPageHandler}
                    />
                </>
            }

        </div>
    );
}

export default BookShowcase;