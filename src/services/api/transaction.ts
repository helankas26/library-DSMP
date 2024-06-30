import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Transaction from "../../model/Transaction.ts";
import HttpResponseWithPagination from "../../utils/http-response-with-pagination.ts";

const TRANSACTIONS: string = '/transactions';

const findAllTransactions = async () => {
    return await AxiosInstance.get<HttpResponse<Transaction[]>>(TRANSACTIONS);
}

const findAllTransactionsWithPagination = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Transaction[]>>(`${TRANSACTIONS}/list?page=${page}&size=${size}`);
}

const findAllTransactionsBySearchWithPagination = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Transaction[]>>(`${TRANSACTIONS}/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const findAllTransactionsWithPaginationByAuthUser = async (page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Transaction[]>>(`${TRANSACTIONS}/auth/list?page=${page}&size=${size}`);
}

const findAllTransactionsBySearchWithPaginationByAuthUser = async (searchText: string, page: number, size: number) => {
    return await AxiosInstance.get<HttpResponseWithPagination<Transaction[]>>(`${TRANSACTIONS}/auth/query?searchText=${searchText}&page=${page}&size=${size}`);
}

const createTransaction = async (transaction: Transaction) => {
    return await AxiosInstance.post<HttpResponse<Transaction>>(TRANSACTIONS, {...transaction});
}

const findTransactionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}`);
}

const findTransactionByIdWithByAuthUser = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}/auth`);
}

const getTransactionFineDetailsById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}/fines`);
}

const updateTransaction = async (id: string, transaction: Transaction) => {
    return await AxiosInstance.patch<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}`, {...transaction});
}

const deleteTransaction = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${TRANSACTIONS}/${id}`);
}

export default {
    findAllTransactions,
    findAllTransactionsWithPagination,
    findAllTransactionsBySearchWithPagination,
    findAllTransactionsWithPaginationByAuthUser,
    findAllTransactionsBySearchWithPaginationByAuthUser,
    createTransaction,
    findTransactionById,
    findTransactionByIdWithByAuthUser,
    getTransactionFineDetailsById,
    updateTransaction,
    deleteTransaction
};