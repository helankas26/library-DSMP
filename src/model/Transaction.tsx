import Book from "./Book.tsx";
import Profile from "./Profile.tsx";

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