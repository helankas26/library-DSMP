import React, {Dispatch, SetStateAction} from "react";

import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";

const CategoryFilterList: React.FC<{
    categories: CategoryFilterListProps[];
    onCategoryChange: Dispatch<SetStateAction<string>>;
}> = (props) => {

    if (props.categories.length === 0) {
        return (
            <>
                <button aria-current="true" type="button"
                        onClick={() => {props.onCategoryChange('')}}
                        className="w-full px-4 py-2 font-medium text-left border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700">
                    All category
                </button>
                <button disabled type="button"
                        className="w-full px-4 py-2 font-medium text-left bg-gray-100 rounded-b-lg cursor-not-allowed">
                    No categories found
                </button>
            </>

        );
    }

    return (
        <>
            <button aria-current="true" type="button"
                    onClick={() => {props.onCategoryChange('')}}
                    className="w-full px-4 py-2 font-medium text-left border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700">
                All category
            </button>

            {props.categories.map((category, index: number) => {
                let buttonClass = "w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700";

                if (index === props.categories.length - 1) {
                    buttonClass = "w-full px-4 py-2 font-medium text-left rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700";
                }

                return (
                    <button type="button"
                            onClick={() => {props.onCategoryChange(category._id)}}
                            key={category._id}
                            className={buttonClass}
                    >
                        {category.categoryName}
                    </button>
                );
            })}
        </>
    );
}

export default CategoryFilterList;