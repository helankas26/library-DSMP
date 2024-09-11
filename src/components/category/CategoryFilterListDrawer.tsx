import React from "react";
import Divider from "@mui/material/Divider";

import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";
import useHomeState from "../../hooks/use-home-state.ts";

const CategoryFilterListDrawer: React.FC<{
    categories: CategoryFilterListProps[];
    onChangeCategoryFilter: (category: string) => void
}> = (props) => {
    const {categories, onChangeCategoryFilter} = props;
    const {selectedCategoryId} = useHomeState();

    if (categories.length === 0) {
        return (
            <>
                <button
                    className={`${selectedCategoryId === '' && 'text-amber-700'} w-full px-4 py-2 font-medium text-left cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`}
                    type="button"
                    onClick={() => {
                        onChangeCategoryFilter('');
                    }}
                    aria-current="true">
                    All category
                </button>
                <Divider/>
                <button
                    type="button"
                    className="w-full px-4 py-2 font-medium text-left bg-gray-100 cursor-not-allowed"
                    disabled>
                    No categories found
                </button>
                <Divider/>
            </>

        );
    }

    return (
        <>
            <button
                className={`${selectedCategoryId === '' && 'text-amber-700'} w-full px-4 py-2 font-medium text-left cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`}
                type="button"
                onClick={() => {
                    onChangeCategoryFilter('');
                }}>
                All category
            </button>
            <Divider/>

            {categories.map((category) => {
                return (
                    <>
                        <button
                            className={`${selectedCategoryId === category._id && 'text-amber-700'} w-full px-4 py-2 font-medium text-left cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`}
                            type="button"
                            onClick={() => {
                                onChangeCategoryFilter(category._id);
                            }}
                            key={category._id}>
                            {category.categoryName}
                        </button>
                        <Divider/>
                    </>
                );
            })}
        </>
    );
}

export default CategoryFilterListDrawer;