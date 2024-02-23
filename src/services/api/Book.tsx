import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Book from "../../model/Book.tsx";


const BOOKS: string = '/books';

const findAllBooks = async () => {
    return await AxiosInstance.get<HttpResponse<Book>>(BOOKS);
}

const createBook = async (book: Book) => {
    return await AxiosInstance.post<HttpResponse<Book>>(BOOKS, {book});
}

const findBookById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Book>>(`${BOOKS}/${id}`);
}

const updateBook = async (id: string, book: Book) => {
    return await AxiosInstance.patch<HttpResponse<Book>>(`${BOOKS}/${id}`, {book});
}

const deleteBook = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${BOOKS}/${id}`);
}

export default {
    findAllBooks,
    createBook,
    findBookById,
    updateBook,
    deleteBook
};