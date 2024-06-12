import React, {FormEvent, useState} from "react";
import {Form} from "react-router-dom";

import SaveRecordButton from "../shared/SaveRecordButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Author from "../../model/Author.ts";
import authorService from "../../services/api/author.ts";

const AuthorCreateForm: React.FC = () => {
    const {showError, showAlert} = useSnackbar();

    const [name, setName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const saveAuthorHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        const author: Author = {
            name: name
        } as Author;

        try {
            await authorService.createAuthor(author);
            showAlert("Author created successfully!", "success");

            setName('');
        } catch (error: any) {
            showError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4">
                <Form className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10" onSubmit={saveAuthorHandler}>
                    <div className="w-full">
                        <label htmlFor="name"
                               className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required={true}
                            placeholder="Enter author name"/>
                    </div>
                    <SaveRecordButton model={'Author'} isSubmitting={isSubmitting}/>
                </Form>
            </div>
        </div>
    );
}

export default AuthorCreateForm;