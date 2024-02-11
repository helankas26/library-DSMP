import React from "react";
import BookShowcaseItem from "./BookShowcaseItem.tsx";

const BookShowcase: React.FC = () => {
    return (
        <div className="flex gap-x-10 gap-y-6 flex-wrap">
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