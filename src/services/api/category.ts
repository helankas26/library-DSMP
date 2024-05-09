import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Category from "../../model/Category.ts";
import Book from "../../model/Book.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";


const CATEGORIES: string = '/categories';

const findAllCategories = async () => {
    return await AxiosInstance.get<HttpResponse<Category[]>>(CATEGORIES);
}

const findAllBooksWithPaginationById = async (id: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Book[]>>(`${CATEGORIES}/find-all/${id}?page=${page}&size=${size}`);
}

const createCategory = async (category: Category) => {
    return await AxiosInstance.post<HttpResponse<Category>>(CATEGORIES, {category});
}

const findCategoryById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Category>>(`${CATEGORIES}/${id}`);
}

const updateCategory = async (id: string, category: Category) => {
    return await AxiosInstance.patch<HttpResponse<Category>>(`${CATEGORIES}/${id}`, {category});
}

const deleteCategory = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${CATEGORIES}/${id}`);
}

export default {
    findAllCategories,
    findAllBooksWithPaginationById,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory
};