import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import CategoryCreateForm from "./CategoryCreateForm.tsx";
import CategoryUpdateForm from "./CategoryUpdateForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Category from "../../model/Category.ts";
import categoryService from "../../services/api/category.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const CategoryDetails = React.lazy(() => import('./CategoryDetails.tsx'));

const CategoryList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateCategory, setUpdateCategory] = useState<Category>();

    const loadCategories = useCallback(async () => {
        try {
            const response = await categoryService.findAllCategoriesWithPagination(page, size);

            const {categories, from, to, totalCount, totalPages} = response.data;
            const sortedCategories = categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            setCategories(sortedCategories);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchText]);


    const searchCategories = useCallback(async () => {
        try {
            const response = await categoryService.findAllCategoriesBySearchWithPagination(searchText, page, size);

            const {categories, from, to, totalCount, totalPages} = response.data;
            const sortedCategories = categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            setCategories(sortedCategories);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);
            setDelay(0);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    }, [page, searchText]);

    const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setPage(1);
        setDelay(750);
    };

    const nextPageHandler = async () => {
        if (page < totalPages) {
            setPage((prevState) => prevState + 1);
        }
    };

    const prevPageHandler = async () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
        }
    };

    const categoryViewHandler = async (id: string) => {
        try {
            const response = await categoryService.findCategoryById(id);
            const {category} = response.data;
            return category;
        } catch (error: any) {
            showError(error);
        }
    };

    const categoryUpdateHandler = async (id: string) => {
        try {
            const response = await categoryService.findCategoryById(id);
            const {category} = response.data;
            setUpdateCategory(category);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshCategoriesHandler = async () => {
        if (!searchText) {
            await loadCategories();
        } else {
            await searchCategories();
        }
    };

    const categoryDeleteHandler = async (category: Category, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (category._id === updateCategory?._id) {
                showError({message: "Can not delete. This category is to update!"});
                setOpen(false);
                return;
            }

            await categoryService.deleteCategory(category._id);
            showAlert("Category deleted successfully!", "success");
            await refreshCategoriesHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadCategories();
        }
    }, [loadCategories]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchCategories();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchCategories]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {!toggleUpdate && <CategoryCreateForm onRefreshCategories={refreshCategoriesHandler}/>}

                {toggleUpdate && updateCategory &&
                    <CategoryUpdateForm
                        key={updateCategory._id}
                        category={updateCategory}
                        setUpdateCategory={setUpdateCategory}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshCategories={refreshCategoriesHandler}
                    />
                }

                <ContextHeader
                    title={"Categories"}
                    description={"All Category"}
                    elementRef={elementRef}
                    searchTextChangeHandler={searchTextChangeHandler}
                />
            </div>


            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[33vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && categories.length === 0 &&
                    <div className="w-full h-[33vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No categories were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && categories.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead
                            className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">
                                    Category Name
                                </th>
                                <th className="px-5 py-3 font-semibold">
                                    Description
                                </th>
                                <th className="px-5 py-3 font-semibold">
                                    Books
                                </th>
                                <th className="px-5 py-3 font-semibold">
                                    View Option
                                </th>
                                <th className="px-5 py-3 font-semibold">
                                    Update Option
                                </th>
                                <th className="px-5 py-3 font-semibold">
                                    Delete Option
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {categories.map((category) => (
                                <tr key={category._id} className="border-b border-gray-200">
                                    <td className="px-5 py-2">
                                        <p className="text-gray-900 whitespace-nowrap">{category.categoryName}</p>
                                    </td>
                                    <td className="px-5 py-2 max-w-xs overflow-hidden">
                                        <p className="text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                            {category.description}
                                        </p>
                                    </td>
                                    <td className="px-5 py-2 max-w-xs overflow-hidden">
                                        {category.books.map((book) => (
                                            <p key={book._id}
                                               className="hover:bg-gray-200 pl-2.5 rounded text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">{`${book.title} ${book.edition}`}</p>
                                        ))}
                                    </td>
                                    <td className="px-5 py-2">
                                        <ViewButton id={category._id} onView={categoryViewHandler} type={"Category"}
                                                    DetailsView={CategoryDetails}/>
                                    </td>
                                    <td className="px-5 py-2">
                                        <UpdateButton id={category._id} onUpdate={categoryUpdateHandler}/>
                                    </td>
                                    <td className="px-5 py-2">
                                        <DeleteButton type={"category"} record={category} onDelete={categoryDeleteHandler}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && categories.length > 0 &&
                <PaginationBar
                    title={"authors"}
                    style={'mt-2.5'}
                    page={page}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    from={from}
                    to={to}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            }
        </>
    );
}

export default CategoryList;