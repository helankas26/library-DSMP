import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import Category from "../../model/Category.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import categoryService from "../../services/api/category.ts";

const CategoryUpdateForm: React.FC<{
    category: Category;
    setUpdateCategory: Dispatch<SetStateAction<Category | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshCategories: () => Promise<void>
}> = (props) => {
    const {category, setUpdateCategory, setToggleUpdate, onRefreshCategories} = props;
    const {showError, showAlert} = useSnackbar();

    const [categoryName, setCategoryName] = useState<string>(category.categoryName);
    const [description, setDescription] = useState<string>(category.description);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateCategoryHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedCategory: Category = {
            categoryName: categoryName,
            description: description
        } as Category;

        try {
            await categoryService.updateCategory(category._id, editedCategory);
            showAlert("Category updated successfully!", "success");
            await onRefreshCategories();
            setToggleUpdate(false);
            setUpdateCategory(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateCategory(undefined);
    };

    return (
        <div className="min-w-full border rounded">
            <div className="mx-auto max-w-screen-xl p-4">
                <Form className="flex flex-col gap-5" onSubmit={updateCategoryHandler}>
                    <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
                        <div className="w-full">
                            <label htmlFor="categoryName"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Category Name</label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter category name"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="description"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter description"/>
                        </div>
                    </div>
                    <div className="w-full flex gap-5 sm:gap-10">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                        <CancelButton isUpdating={isUpdating} onCancel={cancelUpdateHandler}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CategoryUpdateForm;