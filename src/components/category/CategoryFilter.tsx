import React, {useCallback, useEffect, useState} from "react";

import CategoryFilterList from "./CategoryFilterList.tsx";
import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";
import categoryService from "../../services/api/category.ts"
import useSnackbar from "../../hooks/use-snackbar.ts";

const CategoryFilter: React.FC<{ onChangeSelectedCategory: (category: string) => void }> = (props) => {
    const {showError} = useSnackbar();
    const {onChangeSelectedCategory} = props;

    const [categories, setCategories] = useState<CategoryFilterListProps[]>([]);

    const loadCategoryFilters = useCallback(async () => {
        try {
            const response = await categoryService.findAllCategories();
            const sortedCategories = response.data.categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            setCategories(sortedCategories as unknown as CategoryFilterListProps[]);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    useEffect(() => {
        loadCategoryFilters();
    }, [loadCategoryFilters]);

    return (
        <div
            className="mx-1.5 w-48 max-h-[65vh] overflow-y-auto no-scrollbar text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow drop-shadow">
            <CategoryFilterList categories={categories} onChangeCategoryFilter={onChangeSelectedCategory}/>
        </div>
    );
}

export default CategoryFilter;