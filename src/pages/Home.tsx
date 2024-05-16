import React, {useState} from "react";

import CategoryFilter from "../components/category/CategoryFilter.tsx";
import MainBanner from "../components/MainBanner.tsx";
import BookShowcase from "../components/book/BookShowcase.tsx";

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState('');

    const changeSelectedCategoryHandler = (category: string) => {
        setPage(1);
        setSelectedCategory(category);
    };

    return (
        <div className="py-6 container mx-auto flex flex-1">
            <div className="hidden sm:block">
                <div className="sm:sticky sm:top-[80px]">
                    <CategoryFilter selectedCategory={selectedCategory} onChangeSelectedCategory={changeSelectedCategoryHandler}/>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-6 mx-1.5">
                <MainBanner/>
                <BookShowcase page={page} setPage={setPage} selectedCategory={selectedCategory}/>
            </div>
        </div>
    );
}

export default Home;