import React, {Dispatch, SetStateAction, Suspense, useState} from "react";

const ViewModal = React.lazy(() => import('./ViewModal.tsx'));

const ViewButton: React.FC<{
    id: string;
    title: string;
    description: string;
    DetailsView: React.LazyExoticComponent<React.FC<{ id: string; setIsOpen: Dispatch<SetStateAction<boolean>> }>>
}> = (props) => {
    const {id, title, description, DetailsView} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-green-900 transition duration-150 bg-green-100 hover:bg-green-200 active:bg-green-300 active:bg-opacity-75 leading-tight rounded shadow"
                type="button"
                onClick={() => setIsOpen(true)}>
                View
            </button>

            {isOpen && (
                <Suspense>
                    <ViewModal id={id} title={title} description={description} open={isOpen} setIsOpen={setIsOpen} DetailsView={DetailsView}/>
                </Suspense>
            )}
        </>
    );
}

export default ViewButton;