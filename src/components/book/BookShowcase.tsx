import React, {useCallback, useEffect, useState} from "react";

import BookShowcaseItem from "./BookShowcaseItem.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Book from "../../model/Book.ts";
import bookService from "../../services/api/book.ts";

const BookShowcase: React.FC = () => {
    const {showError} = useSnackbar();

    const [books, setBooks] = useState<Book[]>([]);

    const loadShowcaseBooks = useCallback(async () => {
        try {
            const response = await bookService.findAllBooks();
            setBooks(response.data.books);
        } catch (error: any) {
            showError(error);
        }

    }, []);

    useEffect(() => {
        loadShowcaseBooks();
    }, [loadShowcaseBooks]);

    return (
        <div className="flex justify-center lg:justify-normal gap-x-12 gap-y-6 flex-wrap">
            {books.map((book) => (
                <BookShowcaseItem key={book._id} book={book}/>
            ))}
        </div>
    );
}

export default BookShowcase;