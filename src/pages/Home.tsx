import React from "react";
import CategoryFilter from "../components/category/CategoryFilter.tsx";
import MainBanner from "../components/MainBanner.tsx";
import BookShowcase from "../components/book/BookShowcase.tsx";

const Home: React.FC = () => {
    return (
        <div className="py-6 container mx-auto flex flex-1">
            <div className="hidden sm:block">
                <div className="sm:sticky sm:top-[95px]">
                    <CategoryFilter/>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-6 mx-1.5">
                <MainBanner/>
                <BookShowcase/>
            </div>
        </div>
    );
}

export default Home;