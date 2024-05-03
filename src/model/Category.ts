import Book from "./Book.ts";

interface AuthCardProps {
    _id: string;
    categoryName: string;
    description: string;
    books: Book[];
}

export default AuthCardProps;