import Author from "./Author.ts";
import Category from "./Category.ts";

interface Book {
    _id: string;
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