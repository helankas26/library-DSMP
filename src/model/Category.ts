import Book from "./Book.ts";

interface Category {
    _id: string;
    categoryName: string;
    description: string;
    books: Book[];
}

export default Category;