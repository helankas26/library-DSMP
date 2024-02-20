import Author from "./Author.tsx";
import Category from "./Category.tsx";

interface Book {
    id: string;
    title: string;
    edition: string;
    cover: string;
    description: string;
    authors: Author[];
    category: Category[];
    noOfCopies: number;
    availableCount: number;
    createdAt: Date;
}

export default Book;