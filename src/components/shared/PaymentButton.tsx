import React, {Suspense, useState} from "react";

const PaymentModal = React.lazy(() => import('./PaymentModal.tsx'));

const PaymentButton: React.FC<{
    id: string;
    onPayment: (id: string) => Promise<any>;
    type: string;
    PaymentDetails: React.LazyExoticComponent<React.FC<{ record: any; onClose: () => Promise<void> }>>;
    onRefreshPayment: () => Promise<void>
}> = (props) => {
    const {id, onPayment, type, PaymentDetails, onRefreshPayment} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [record, setRecord] = useState<any>();

    const paymentHandler = async () => {
        const record = await onPayment(id);
        if (record) {
            setRecord(record);
            setIsOpen(true);
        }
    };

    const closeHandler = async () => {
        await onRefreshPayment();
        setRecord(undefined);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-white transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 leading-tight rounded shadow whitespace-nowrap"
                type="button"
                onClick={paymentHandler}>
                Pay {type}
            </button>

            {isOpen && (
                <Suspense>
                    <PaymentModal record={record} type={type} open={isOpen} onClose={closeHandler} PaymentDetails={PaymentDetails}/>
                </Suspense>
            )}
        </>
    );
}

export default PaymentButton;