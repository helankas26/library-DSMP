import React from "react";
import CategoryFilterList from "./CategoryFilterList.tsx";
import CategoryFilterListProps from "../../model/CategoryFilterListProps.tsx";

const CategoryFilter: React.FC = () => {
    const categories: CategoryFilterListProps[] = [];

    return (
        <div
            className="mx-1.5 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow drop-shadow">
            <CategoryFilterList categories={categories}/>
        </div>
    );
}

export default CategoryFilter;