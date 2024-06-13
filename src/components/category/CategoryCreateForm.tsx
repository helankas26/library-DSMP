import React, {FormEvent, useState} from "react";
import {Form} from "react-router-dom";

import SaveRecordButton from "../shared/SaveRecordButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Category from "../../model/Category.ts";
import categoryService from "../../services/api/category.ts";

const CategoryCreateForm: React.FC = () => {
    const {showError, showAlert} = useSnackbar();

    const [categoryName, setCategoryName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const saveCategoryHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        const category: Category = {
            categoryName: categoryName,
            description: description
        } as Category;

        try {
            await categoryService.createCategory(category);
            showAlert("Category created successfully!", "success");

            setCategoryName('');
            setDescription('');
        } catch (error: any) {
            showError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-w-full border rounded">
            <div className="mx-auto max-w-screen-xl p-4">
                <Form className="flex flex-col gap-5" onSubmit={saveCategoryHandler}>
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
                    <SaveRecordButton model={'Category'} isSubmitting={isSubmitting}/>
                </Form>
            </div>
        </div>
    );
}

export default CategoryCreateForm;