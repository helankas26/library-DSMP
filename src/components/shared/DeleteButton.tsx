import React, {Dispatch, SetStateAction, Suspense, useState} from "react";

const DeleteModal = React.lazy(() => import('./DeleteModal.tsx'));

const DeleteButton: React.FC<{
    type: string;
    record: any,
    onDelete: (record: any, setOpen: Dispatch<SetStateAction<boolean>>) => Promise<void>
}> = (props) => {
    const {type, record, onDelete} = props;
    const [open, setOpen] = useState<boolean>(false);

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = async () => {
        await onDelete(record, setOpen);
    };

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-red-900 transition duration-150 bg-red-100 hover:bg-red-200 active:bg-red-300 active:bg-opacity-75 leading-tight rounded shadow"
                type="button"
                onClick={() => setOpen(true)}>
                Delete
            </button>

            {open && (
                <Suspense>
                    <DeleteModal type={type} open={open} onClose={closeHandler} onDelete={deleteHandler}/>
                </Suspense>
            )}
        </>
    );
}

export default DeleteButton;