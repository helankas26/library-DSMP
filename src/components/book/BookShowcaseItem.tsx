import React from "react";

import Book from "../../model/Book.ts";

const BookShowcaseItem: React.FC<{ book: Book; style: string; }> = (props) => {
    const {book, style} = props;

    return (
        <div
            className={`relative grid h-[24rem] w-full ${style} flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700`}>
            <div
                className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <img className="rounded-t-xl h-full w-full"
                     src={book.cover}
                     alt={book.name}/>
                <div
                    className="absolute inset-0 w-full h-full to-black/10 bg-gradient-to-t from-black/95 via-black/35"></div>
            </div>
            <div className="relative py-6 px-3 space-y-2">
                <h2 className="block font-sans text-4xl font-medium tracking-normal text-white antialiased bg-gray-700 bg-opacity-75 rounded-xl px-2">
                    {book.title}
                </h2>
                <h2 className="block font-sans text-lg text-center font-medium tracking-normal text-orange-700 antialiased bg-gray-600 bg-opacity-75 rounded-xl px-2">
                    {book.edition}
                </h2>
            </div>
        </div>
    );
}

export default BookShowcaseItem;