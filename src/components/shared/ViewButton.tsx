import React, {Suspense, useState} from "react";

const ViewModal = React.lazy(() => import('./ViewModal.tsx'));

const ViewButton: React.FC<{
    id: string;
    onView: (id: string) => Promise<any>;
    type: string;
    DetailsView: React.LazyExoticComponent<React.FC<{ record: any }>>
}> = (props) => {
    const {id, onView, type, DetailsView} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [record, setRecord] = useState<any>();

    const viewHandler = async () => {
        const record = await onView(id);
        if (record) {
            setRecord(record);
            setIsOpen(true);
        }
    };

    const closeHandler = () => {
        setRecord(undefined);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-green-900 transition duration-150 bg-green-100 hover:bg-green-200 active:bg-green-300 active:bg-opacity-75 leading-tight rounded shadow"
                type="button"
                onClick={viewHandler}>
                View
            </button>

            {isOpen && (
                <Suspense>
                    <ViewModal record={record} type={type} open={isOpen} onClose={closeHandler} DetailsView={DetailsView}/>
                </Suspense>
            )}
        </>
    );
}

export default ViewButton;