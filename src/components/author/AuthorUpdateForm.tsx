import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Author from "../../model/Author.ts";
import authorService from "../../services/api/author.ts";

const AuthorUpdateForm: React.FC<{
    author: Author;
    setUpdateAuthor: Dispatch<SetStateAction<Author | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshAuthors: () => Promise<void>
}> = (props) => {
    const {author, setUpdateAuthor, setToggleUpdate, onRefreshAuthors} = props;
    const {showError, showAlert} = useSnackbar();

    const [name, setName] = useState<string>(author.name);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateAuthorHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedAuthor: Author = {
            name: name
        } as Author;

        try {
            await authorService.updateAuthor(author._id, editedAuthor);
            showAlert("Author updated successfully!", "success");
            await onRefreshAuthors();
            setToggleUpdate(false);
            setUpdateAuthor(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateAuthor(undefined);
    };

    return (
        <div className="min-w-full border rounded">
            <div className="mx-auto max-w-screen-xl p-4">
                <Form className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10" onSubmit={updateAuthorHandler}>
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
                    <div className="w-full flex gap-5">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                        <CancelButton isUpdating={isUpdating} onCancel={cancelUpdateHandler}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AuthorUpdateForm;