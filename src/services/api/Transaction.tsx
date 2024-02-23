import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Transaction from "../../model/Transaction.tsx";


const TRANSACTIONS: string = '/transactions';

const findAllTransactions = async () => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(TRANSACTIONS);
}

const createTransaction = async (transaction: Transaction) => {
    return await AxiosInstance.post<HttpResponse<Transaction>>(TRANSACTIONS, {transaction});
}

const findTransactionById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}`);
}

const updateTransaction = async (id: string, transaction: Transaction) => {
    return await AxiosInstance.patch<HttpResponse<Transaction>>(`${TRANSACTIONS}/${id}`, {transaction});
}

const deleteTransaction = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${TRANSACTIONS}/${id}`);
}

export default {
    findAllTransactions,
    createTransaction,
    findTransactionById,
    updateTransaction,
    deleteTransaction
};