import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Author from "../../model/Author.tsx";
import Admission from "../../model/Admission.tsx";


const AUTHORS: string = '/authors';

const findAllAuthors = async () => {
    return await AxiosInstance.get<HttpResponse<Author>>(AUTHORS);
}

const createAuthor = async (author: Author) => {
    return await AxiosInstance.post<HttpResponse<Author>>(AUTHORS, {author});
}

const findAuthorById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Admission>>(`${AUTHORS}/${id}`);
}

const updateAuthor = async (id: string, author: Author) => {
    return await AxiosInstance.patch<HttpResponse<Admission>>(`${AUTHORS}/${id}`, {author});
}

const deleteAuthor = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${AUTHORS}/${id}`);
}

export default {
    findAllAuthors,
    createAuthor,
    findAuthorById,
    updateAuthor,
    deleteAuthor
};