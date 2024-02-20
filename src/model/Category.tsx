import Book from "./Book.tsx";

interface AuthCardProps {
    id: string;
    categoryName: string;
    description: string;
    books: Book[];
}

export default AuthCardProps;