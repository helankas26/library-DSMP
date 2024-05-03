import Book from "./Book.ts";

interface Author {
    _id: string;
    name: string;
    books: Book[];
}

export default Author;