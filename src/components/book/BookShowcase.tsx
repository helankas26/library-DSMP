import React from "react";
import BookShowcaseItem from "./BookShowcaseItem.tsx";

const BookShowcase: React.FC = () => {
    return (
        <div className="flex justify-center lg:justify-normal gap-x-12 gap-y-6 flex-wrap">
            <BookShowcaseItem/>
            <BookShowcaseItem/>
            <BookShowcaseItem/>
            <BookShowcaseItem/>
            <BookShowcaseItem/>
            <BookShowcaseItem/>
            <BookShowcaseItem/>
        </div>
    );
}

export default BookShowcase;