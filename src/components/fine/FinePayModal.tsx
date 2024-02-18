import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import FinePayment from "./FinePayment.tsx";

const FinePayModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                className="px-4 py-2 font-semibold text-white transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 leading-tight rounded shadow focus:outline-none focus:shadow-outline "
                onClick={() => setIsOpen(true)}
                type="button">
                Pay Fine
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                                    className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-gray-600 font-semibold">
                                        Fine payment
                                    </Dialog.Title>
                                    <Dialog.Description
                                        as="span"
                                        className="text-xs">
                                        Fine for overdue return
                                    </Dialog.Description>

                                    <div className="mt-4">
                                        <FinePayment/>
                                    </div>

                                    <div className=" flex justify-center mt-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-semibold text-gray-100 rounded-md shadow border border-transparent transition duration-150 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default FinePayModal;