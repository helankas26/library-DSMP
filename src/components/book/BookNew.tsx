import React, {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {Form} from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import SaveRecordButton from "../shared/SaveRecordButton.tsx";
import ComboboxSingleSelect from "../shared/ComboboxSingleSelect.tsx";
import ComboboxMultipleSelect from "../shared/ComboboxMultipleSelect.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import {resizeBookImage} from "../../utils/image-optimizer.ts";
import bookCoverImage from "../../assets/book-cover.png";
import bookFirebaseService from "../../services/firebase/book.ts";
import Book from "../../model/Book.ts";
import bookService from "../../services/api/book.ts";
import categoryService from "../../services/api/category.ts";
import authorService from "../../services/api/author.ts";
import Author from "../../model/Author.ts";
import Category from "../../model/Category.ts";

const BookNew: React.FC = () => {
    const {showError, showAlert} = useSnackbar();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [cover, setCover] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [edition, setEdition] = useState<string>('');
    const [noOfCopies, setNoOfCopies] = useState<number>(0);
    const [category, setCategory] = useState<Category | null>(null);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [description, setDescription] = useState<string>('');
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [authorsList, setAuthorsList] = useState<Author[]>([]);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const loadCategoriesList = useCallback(async () => {
        try {
            const response = await categoryService.findAllCategories();

            const {categories} = response.data;
            const sortedCategories = categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            setCategoriesList(sortedCategories);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadAuthorsList = useCallback(async () => {
        try {
            const response = await authorService.findAllAuthors();

            const {authors} = response.data;
            const sortedAuthors = authors.sort((a, b) => a.name.localeCompare(b.name));
            setAuthorsList(sortedAuthors);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (file) {
            try {
                const imageFile = await resizeBookImage(file);
                const preview = URL.createObjectURL(imageFile);
                setImagePreview(preview);
                setCover(imageFile);
            } catch (error: any) {
                showError(error);
                setCover(null);
                setImagePreview('');
                fileInputRef.current!.value = '';
            }
        }
    };

    const resetFileInput = () => {
        setCover(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveBookHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);
        let imageURL: string = bookCoverImage;

        if (cover) {
            try {
                imageURL = await bookFirebaseService.uploadBookImage(cover);
            } catch (error: any) {
                showError(error);
            }
        }

        const authorsIds: string[] = authors.map(author => author._id);
        const categoryId: string = category!._id;

        const book: Book = {
            title: title,
            edition: edition || undefined,
            cover: imageURL,
            description: description,
            authors: authorsIds,
            category: categoryId,
            noOfCopies: noOfCopies
        } as unknown as Book;

        try {
            await bookService.createBook(book);
            showAlert("Book created successfully!", "success");

            setCover(null);
            setTitle('');
            setEdition('');
            setNoOfCopies(0);
            setCategory(null);
            setAuthors([]);
            setDescription('');
            setImagePreview('');
            fileInputRef.current!.value = '';
        } catch (error: any) {
            await bookFirebaseService.deleteBookImage(imageURL);
            showError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        loadAuthorsList();
        loadCategoriesList();
    }, [loadAuthorsList, loadCategoriesList]);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex justify-center">
                    <div className="relative flex-shrink-0 w-32 h-36">
                        <img className="w-full h-full border rounded-md"
                             src={imagePreview || bookCoverImage}
                             alt="book cover"/>
                        {cover && (
                            <button
                                className="absolute cursor-pointer -bottom-2 -right-2 w-8 h-8 shadow border border-red-500 transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-full flex items-center justify-center"
                                onClick={resetFileInput}>
                                <CloseRoundedIcon/>
                            </button>
                        )}
                    </div>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={saveBookHandler}>
                    <div className="flex flex-col xl:flex-row gap-5">
                        <div className="flex flex-col md:flex-row gap-5 w-full justify-evenly items-center md:items-stretch">
                            <div className="font-[sans-serif] w-full sm:w-1/2 md:w-1/3 lg:w-1/2">
                                <label
                                    htmlFor="cover"
                                    className="text-sm text-black mb-2 block">Upload cover</label>
                                <input
                                    className="w-full text-black text-sm bg-white border border-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
                                    id="cover"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={fileChangeHandler}
                                    accept="image/jpeg, image/png"/>
                                <p className="text-xs text-gray-400 mt-2">JPEG, JPG and PNG are Allowed.</p>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2">
                                <label htmlFor="title"
                                       className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                    required={true}
                                    placeholder="Enter book title"/>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full justify-evenly items-center md:items-stretch">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2">
                                <label htmlFor="edition"
                                       className="block text-gray-600 text-sm font-semibold mb-2">Edition</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="edition"
                                    type="text"
                                    value={edition}
                                    onChange={(e) => {
                                        setEdition(e.target.value);
                                    }}
                                    placeholder="Enter edition"/>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2">
                                <label htmlFor="noOfCopies"
                                       className="block text-gray-600 text-sm font-semibold mb-2">No of Copies</label>
                                <input
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="noOfCopies"
                                    type="number"
                                    step={1}
                                    min={0}
                                    value={noOfCopies}
                                    onChange={(e) => {
                                        setNoOfCopies(parseInt(e.target.value));
                                    }}
                                    required={true}
                                    placeholder="Enter no of copies"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 sm:items-center md:items-stretch md:justify-evenly">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                            <label htmlFor="category"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Category</label>
                            <ComboboxSingleSelect
                                id={"category"}
                                objects={categoriesList}
                                displayField={"categoryName"}
                                selectedObject={category}
                                setSelectedObject={setCategory}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                            <label htmlFor="authors"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Authors</label>
                            <ComboboxMultipleSelect
                                id={"authors"}
                                objects={authorsList}
                                displayField={"name"}
                                selectedObjects={authors}
                                setSelectedObjects={setAuthors}
                            />
                            <p className="font-[sans-serif] text-xs text-gray-400 mt-2">
                                Multiple selections are Allowed. Press and hold <kbd
                                className="bg-gray-200 rounded border border-gray-400 shadow text-gray-800 inline-block text-xs font-bold leading-none px-1 py-0.5 whitespace-nowrap">
                                Ctrl </kbd> (Windows) or <kbd
                                className="bg-gray-200 rounded border border-gray-400 shadow text-gray-800 inline-block text-xs font-bold leading-none px-1 py-0.5 whitespace-nowrap">
                                Cmd</kbd> (Mac).
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full">
                            <label htmlFor="description"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                            <textarea
                                className="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                required={true}
                                placeholder="Write description here..."/>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full flex gap-5">
                            <SaveRecordButton model={'Book'} isSubmitting={isSubmitting}/>
                        </div>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default BookNew;