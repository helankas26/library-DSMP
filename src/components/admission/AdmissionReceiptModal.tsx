import React, {Fragment} from "react";
import {Dialog, Transition} from '@headlessui/react'

import Profile from "../../model/Profile.ts";
import Admission from "../../model/Admission.ts";

const AdmissionReceiptModal: React.FC<{
    profile: Profile,
    admission: Admission;
    open: boolean;
    onClose: () => void;
}> = (props) => {
    const {profile, admission, open, onClose} = props;

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

                    <div className="fixed inset-0 bg-black/75"/>
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
                                className="w-full max-w-xs transform overflow-hidden rounded-xl bg-white p-6 align-middle shadow-xl transition-all">
                                <Dialog.Title as="div" className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </Dialog.Title>
                                <Dialog.Description as="span" className="text-md text-gray-500">
                                    ID: {profile._id}
                                </Dialog.Description>
                                <div className="mt-2.5">
                                    <p className="text-xl font-semibold">{profile.fullName}</p>
                                    <br/>
                                    <p className="text-2xl font-semibold">Admission Fee:</p>
                                    <p className="text-xl font-semibold text-gray-500">LKR {admission.fee.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="py-2 px-4 font-semibold text-gray-100 rounded-md leading-tight shadow border border-transparent transition duration-150 bg-green-600 hover:bg-green-700 active:bg-green-600 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={onClose}>
                                        Ok
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

export default AdmissionReceiptModal;