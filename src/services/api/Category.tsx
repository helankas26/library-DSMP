import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Category from "../../model/Category.tsx";


const CATEGORIES: string = '/categories';

const findAllCategories = async () => {
    return await AxiosInstance.get<HttpResponse<Category>>(CATEGORIES);
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
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory
};