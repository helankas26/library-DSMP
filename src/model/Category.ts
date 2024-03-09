import Book from "./Book.ts";

interface AuthCardProps {
    id: string;
    categoryName: string;
    description: string;
    books: Book[];
}

export default AuthCardProps;