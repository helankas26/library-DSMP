import React, {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import useSnackbar from "../../hooks/use-snackbar.ts";
import CategoryFilterListProps from "../../model/CategoryFilterListProps.ts";
import categoryService from "../../services/api/category.ts";
import CategoryFilterListDrawer from "./CategoryFilterListDrawer.tsx";

const CategoryFilterDrawer: React.FC<{
    onChangeSelectedCategory: (category: string) => void;
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void
}> = (props) => {
    const {showError} = useSnackbar();
    const {onChangeSelectedCategory, open, toggleDrawer} = props;

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
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
                <CategoryFilterListDrawer categories={categories} onChangeCategoryFilter={onChangeSelectedCategory}/>
            </Box>
        </Drawer>
    );
}

export default CategoryFilterDrawer;
