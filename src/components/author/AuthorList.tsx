import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import AuthorCreateForm from "./AuthorCreateForm.tsx";
import AuthorUpdateForm from "./AuthorUpdateForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Author from "../../model/Author.ts";
import authorService from "../../services/api/author.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const AuthorDetails = React.lazy(() => import('./AuthorDetails.tsx'));

const AuthorList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [authors, setAuthors] = useState<Author[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateAuthor, setUpdateAuthor] = useState<Author>();

    const loadAuthors = useCallback(async () => {
        try {
            const response = await authorService.findAllAuthorsWithPagination(page, size);

            const {authors, from, to, totalCount, totalPages} = response.data;
            const sortedAuthors = authors.sort((a, b) => a.name.localeCompare(b.name));
            setAuthors(sortedAuthors);
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


    const searchAuthors = useCallback(async () => {
        try {
            const response = await authorService.findAllAuthorsBySearchWithPagination(searchText, page, size);

            const {authors, from, to, totalCount, totalPages} = response.data;
            const sortedAuthors = authors.sort((a, b) => a.name.localeCompare(b.name));
            setAuthors(sortedAuthors);
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

    const authorViewHandler = async (id: string) => {
        try {
            const response = await authorService.findAuthorById(id);
            const {author} = response.data;
            return author;
        } catch (error: any) {
            showError(error);
        }
    };

    const authorUpdateHandler = async (id: string) => {
        try {
            const response = await authorService.findAuthorById(id);
            const {author} = response.data;
            setUpdateAuthor(author);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshAuthorsHandler = async () => {
        if (!searchText) {
            await loadAuthors();
        } else {
            await searchAuthors();
        }
    };

    const authorDeleteHandler = async (author: Author, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (author._id === updateAuthor?._id) {
                showError({message: "Can not delete. This author is to update!"});
                setOpen(false);
                return;
            }

            await authorService.deleteAuthor(author._id);
            showAlert("Author deleted successfully!", "success");
            await refreshAuthorsHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadAuthors();
        }
    }, [loadAuthors]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchAuthors();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchAuthors]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {!toggleUpdate && <AuthorCreateForm onRefreshAuthors={refreshAuthorsHandler}/>}

                {toggleUpdate && updateAuthor &&
                    <AuthorUpdateForm
                        key={updateAuthor._id}
                        author={updateAuthor}
                        setUpdateAuthor={setUpdateAuthor}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshAuthors={refreshAuthorsHandler}
                    />
                }

                <ContextHeader
                    title={"Authors"}
                    description={"All Author"}
                    elementRef={elementRef}
                    searchTextChangeHandler={searchTextChangeHandler}
                />
            </div>

            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[41vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && authors.length === 0 &&
                    <div className="w-full h-[41vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No authors were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && authors.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Name</th>
                                <th className="px-5 py-3 font-semibold">Books</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                <th className="px-5 py-3 font-semibold">Update Option</th>
                                <th className="px-5 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {authors.map((author) => (
                                <tr key={author._id} className="border-b border-gray-200">
                                    <td className="px-5 py-2">
                                        <p className="text-gray-900 whitespace-nowrap">{author.name}</p>
                                    </td>
                                    <td className="px-5 py-2 max-w-xs overflow-hidden">
                                        {author.books.map((book) => (
                                            <p key={book._id}
                                               className="hover:bg-gray-200 pl-2.5 rounded text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">{`${book.title} ${book.edition}`}</p>
                                        ))}
                                    </td>
                                    <td className="px-5 py-2">
                                        <ViewButton id={author._id} onView={authorViewHandler} type={"Author"} DetailsView={AuthorDetails}/>
                                    </td>
                                    <td className="px-5 py-2">
                                        <UpdateButton id={author._id} onUpdate={authorUpdateHandler}/>
                                    </td>
                                    <td className="px-5 py-2">
                                        <DeleteButton type={"author"} record={author} onDelete={authorDeleteHandler}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && authors.length > 0 &&
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

export default AuthorList;