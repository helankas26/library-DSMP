import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import Transaction from "../../model/Transaction.ts";

const TRANSACTIONS: string = '/transactions';

const findAllTransactions = async () => {
    return await AxiosInstance.get<HttpResponse<Transaction[]>>(TRANSACTIONS);
}

const createTransaction = async (transaction: Transaction) => {
    return await AxiosInstance.post<HttpResponse<Transaction>>(TRANSACTIONS, {...transaction});
}

const findTransactionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}`);
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
    createTransaction,
    findTransactionById,
    getTransactionFineDetailsById,
    updateTransaction,
    deleteTransaction
};