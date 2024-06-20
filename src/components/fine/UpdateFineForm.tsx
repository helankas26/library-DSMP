import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import Fine from "../../model/Fine.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import fineService from "../../services/api/fine.ts";

const UpdateFineForm: React.FC<{
    fine: Fine;
    setUpdateFine: Dispatch<SetStateAction<Fine | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshFines: () => Promise<void>
}> = (props) => {
    const {fine, setUpdateFine, setToggleUpdate, onRefreshFines} = props;
    const {showError, showAlert} = useSnackbar();

    const [fee, setFee] = useState<number>(fine.fee);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateFineHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedFine: Fine = {
            fee: fee
        } as Fine;

        try {
            await fineService.updateFine(fine._id, editedFine);
            showAlert("Fine updated successfully!", "success");
            await onRefreshFines();
            setToggleUpdate(false);
            setUpdateFine(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateFine(undefined);
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
                    <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 w-14 h-14">
                            <img className="w-full h-full border rounded-full"
                                 src={fine.member.avatar}
                                 alt={fine.member.fullName}/>
                        </div>
                        <div className="ml-3">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{fine.member._id}</p>
                            <p className="text-gray-900">{fine.member.fullName}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex justify-center">
                            <div className="flex-shrink-0 w-14 h-16">
                                <img className="w-full h-full border rounded-md"
                                     src={fine.book.cover}
                                     alt={`${fine.book.title} ${fine.book.edition}`}/>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{fine.book._id}</p>
                            <p className="text-gray-900">{`${fine.book.title} ${fine.book.edition}`}</p>
                        </div>
                    </div>
                </div>

                <Form className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10" onSubmit={updateFineHandler}>
                    <div className="w-full">
                        <label htmlFor="fee"
                               className="block text-gray-600 text-sm font-semibold mb-2">Fee</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="fee"
                            type="number"
                            step={1}
                            min={0}
                            value={fee}
                            onChange={(e) => {
                                setFee(parseInt(e.target.value));
                            }}
                            required={true}
                            placeholder="Enter fee"/>
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

export default UpdateFineForm;