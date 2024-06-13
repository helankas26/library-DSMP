import React, {Dispatch, Fragment, SetStateAction} from "react";
import {Dialog, Transition} from '@headlessui/react'

const ViewModal: React.FC<{
    id: string,
    title: string;
    description: string;
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    DetailsView: React.LazyExoticComponent<React.FC<{ id: string; setIsOpen: Dispatch<SetStateAction<boolean>> }>>
}> = (props) => {
    const {id, title, description, open, setIsOpen, DetailsView} = props;

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                                className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-gray-600 font-semibold">
                                    {title}
                                </Dialog.Title>
                                <Dialog.Description
                                    as="span"
                                    className="text-xs">
                                    {description} details
                                </Dialog.Description>

                                <div className="mt-4">
                                    <DetailsView id={id} setIsOpen={setIsOpen}/>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        className="w-[100px] py-2 px-4 font-semibold text-gray-100 rounded-md leading-tight shadow border border-transparent transition duration-150 bg-red-600 hover:bg-red-500 active:bg-red-600 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => setIsOpen(false)}>
                                        Close
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

export default ViewModal;