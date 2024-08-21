import React, {Dispatch, SetStateAction, Suspense, useState} from "react";

const CancelReservationModal = React.lazy(() => import('./CancelReservationModal.tsx'));

const CancelReservationButton: React.FC<{
    id: string;
    onCancel: (record: any, setOpen: Dispatch<SetStateAction<boolean>>) => Promise<void>
}> = (props) => {
    const {id, onCancel} = props;
    const [open, setOpen] = useState<boolean>(false);

    const closeHandler = () => {
        setOpen(false);
    };

    const cancelHandler = async () => {
        await onCancel(id, setOpen);
    };

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-red-900 transition duration-150 bg-red-100 hover:bg-red-200 active:bg-red-300 active:bg-opacity-75 leading-tight rounded shadow"
                type="button"
                onClick={() => setOpen(true)}>
                Cancel
            </button>

            {open && (
                <Suspense>
                    <CancelReservationModal open={open} onClose={closeHandler} onCancel={cancelHandler}/>
                </Suspense>
            )}
        </>
    );
}

export default CancelReservationButton;