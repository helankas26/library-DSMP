import React, {Fragment} from "react";
import {Dialog, Transition} from '@headlessui/react'

const PaymentModal: React.FC<{
    record: any,
    type: string;
    open: boolean;
    onClose: () => Promise<void>;
    PaymentDetails: React.LazyExoticComponent<React.FC<{ record: any; onClose: () => Promise<void> }>>
}> = (props) => {
    const {record, type, open, onClose, PaymentDetails} = props;

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">

                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">

                            <Dialog.Panel
                                className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-gray-600 font-semibold">
                                    {type} payment
                                </Dialog.Title>
                                <Dialog.Description
                                    as="span"
                                    className="text-xs">
                                    {type === 'Fine' ? "Fine for overdue return" : "Subscription fee payment for member"}
                                </Dialog.Description>

                                <div className="mt-4">
                                    <PaymentDetails record={record} onClose={onClose}/>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        className="px-4 py-2 text-sm font-semibold text-gray-100 rounded-md shadow border border-transparent transition duration-150 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={onClose}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default PaymentModal;