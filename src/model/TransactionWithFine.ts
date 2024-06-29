import Book from "./Book.ts";
import Transaction from "./Transaction.ts";

interface BookWithFine extends Book {
    fine: number;
}

interface TransactionWithFine extends Transaction {
    books: BookWithFine[];
    totalAmount: number;
}

export default TransactionWithFine;