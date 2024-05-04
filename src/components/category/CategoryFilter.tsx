import React, {useCallback, useEffect, useState} from "react";

import CategoryFilterList from "./CategoryFilterList.tsx";
import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";
import categoryService from "../../services/api/category.ts"
import useSnackbar from "../../hooks/use-snackbar.ts";

const CategoryFilter: React.FC = () => {
    const {showError} = useSnackbar();

    const [categories, setCategories] = useState<CategoryFilterListProps[]>([]);

    const loadCategoryFilters = useCallback(async () => {
        try {
            const response = await categoryService.findAllCategories();
            setCategories(response.data.categories as unknown as CategoryFilterListProps[]);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    useEffect(() => {
        loadCategoryFilters();
    }, [loadCategoryFilters]);

    return (
        <div
            className="mx-1.5 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow drop-shadow">
            <CategoryFilterList categories={categories}/>
        </div>
    );
}

export default CategoryFilter;