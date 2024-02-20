import Profile from "./Profile.tsx";
import Book from "./Book.tsx";

interface Fine {
    id: string;
    fee: number;
    member: Profile;
    book: Book;
    noOfDate: number;
    librarian: Profile;
    createdAt: Date;
}

export default Fine;