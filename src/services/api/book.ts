import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Book from "../../model/Book.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";


const BOOKS: string = '/books';

const findAllBooks = async () => {
    return await AxiosInstance.get<HttpResponse<Book[]>>(BOOKS);
}

const findAllBooksWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Book[]>>(`${BOOKS}/list?page=${page}&size=${size}`);
}

const findAllBooksBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Book[]>>(`${BOOKS}/query?searchText=${searchText}&page=${page}&size=${size}`);
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
    findAllBooksWithPagination,
    findAllBooksBySearchWithPagination,
    createBook,
    findBookById,
    updateBook,
    deleteBook
};