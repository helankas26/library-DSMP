import Book from "./Book.ts";
import Profile from "./Profile.ts";

interface Transaction {
    id: string;
    books: Book[];
    member: Profile;
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
    librarian: Profile;
    issuedAt: Date;
    dueAt: Date;
    returnedAt: Date;
}

export default Transaction;