import React from "react";

import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";
import useHomeState from "../../hooks/use-home-state.ts";

const CategoryFilterList: React.FC<{
    categories: CategoryFilterListProps[];
    onChangeCategoryFilter: (category: string) => void
}> = (props) => {
    const {categories, onChangeCategoryFilter} = props;
    const {selectedCategoryId} = useHomeState();

    if (categories.length === 0) {
        return (
            <>
                <button
                    className={`${selectedCategoryId === '' && 'text-amber-700'} w-full px-4 py-2 font-medium text-left border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`}
                    type="button"
                    onClick={() => {
                        onChangeCategoryFilter('');
                    }}
                    aria-current="true">
                    All category
                </button>
                <button
                    type="button"
                    className="w-full px-4 py-2 font-medium text-left bg-gray-100 rounded-b-lg cursor-not-allowed"
                    disabled>
                    No categories found
                </button>
            </>

        );
    }

    return (
        <>
            <button
                className={`${selectedCategoryId === '' && 'text-amber-700'} w-full px-4 py-2 font-medium text-left border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`}
                type="button"
                onClick={() => {
                    onChangeCategoryFilter('');
                }}
                aria-current="true">
                All category
            </button>

            {categories.map((category, index: number) => {
                let buttonClass: string = `${selectedCategoryId === category._id && 'text-amber-700'} w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`;

                if (index === categories.length - 1) {
                    buttonClass = `${selectedCategoryId === category._id && 'text-amber-700'} w-full px-4 py-2 font-medium text-left rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none`;
                }

                return (
                    <button
                        className={buttonClass}
                        type="button"
                        onClick={() => {
                            onChangeCategoryFilter(category._id);
                        }}
                        key={category._id}>
                        {category.categoryName}
                    </button>
                );
            })}
        </>
    );
}

export default CategoryFilterList;