import Book from "./Book.ts";

interface Author {
    id: string;
    name: string;
    books: Book[];
}

export default Author;