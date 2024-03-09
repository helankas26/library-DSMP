import Profile from "./Profile.ts";
import Book from "./Book.ts";

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