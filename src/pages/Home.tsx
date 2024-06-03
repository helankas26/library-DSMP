import React from "react";

import CategoryFilter from "../components/category/CategoryFilter.tsx";
import MainBanner from "../components/core/MainBanner.tsx";
import BookShowcase from "../components/book/BookShowcase.tsx";
import useHomeState from "../hooks/use-home-state.ts";

const Home: React.FC = () => {
    const {setPage, setSelectedCategoryId, setSearchText, setSearching} = useHomeState();

    const changeSelectedCategoryHandler = (category: string) => {
        setSearching('');
        setSearchText('');
        setPage(1);
        setSelectedCategoryId(category);
    };

    return (
        <div className="my-6 container mx-auto flex flex-1">
            <div className="hidden sm:block">
                <div className="sm:sticky sm:top-[80px]">
                    <CategoryFilter onChangeSelectedCategory={changeSelectedCategoryHandler}/>
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