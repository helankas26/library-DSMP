import React from "react";

import CategoryFilter from "../components/category/CategoryFilter.tsx";
import MainBanner from "../components/core/MainBanner.tsx";
import BookShowcase from "../components/book/BookShowcase.tsx";
import useHomeState from "../hooks/use-home-state.ts";
import CategoryFilterFloatingActionButton from "../components/category/CategoryFilterFloatingActionButton.tsx";
import {useMediaQuery} from "@mui/material";

const Home: React.FC = () => {
    const {setPage, setSelectedCategoryId, setSearchText, setSearching} = useHomeState();
    const isSmallScreen = useMediaQuery('(max-width: 1024px)');

    const changeSelectedCategoryHandler = (category: string) => {
        setSearching('');
        setSearchText('');
        setPage(1);
        setSelectedCategoryId(category);
    };

    return (
        <React.Fragment>
            <div className="my-6 container mx-auto flex flex-1">
                <div className="hidden lg:block">
                    <div className="sm:sticky sm:top-[80px]">
                        <CategoryFilter onChangeSelectedCategory={changeSelectedCategoryHandler}/>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-y-6 mx-1.5">
                    <MainBanner/>
                    <BookShowcase/>
                </div>
            </div>

            {isSmallScreen &&
                <CategoryFilterFloatingActionButton onChangeSelectedCategory={changeSelectedCategoryHandler}/>
            }
        </React.Fragment>
    );
}

export default Home;