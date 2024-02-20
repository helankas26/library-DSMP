import Book from "./Book.tsx";

interface Author {
    id: string;
    name: string;
    books: Book[];
}

export default Author;