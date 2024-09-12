import Book from "./Book.ts";
import Profile from "./Profile.ts";
import TransactionStatus from "../enum/TransactionStatus.ts";

interface Transaction {
    _id: string;
    books: Book[];
    member: Profile;
    status: TransactionStatus.Borrowed | TransactionStatus.Returned | TransactionStatus.Overdue;
    librarian: Profile;
    issuedAt: Date;
    dueAt: Date;
    noOfDate: number;
    returnedAt: Date;
}

export default Transaction;