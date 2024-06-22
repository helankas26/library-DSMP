import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import Subscription from "../../model/Subscription.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import subscriptionService from "../../services/api/subscription.ts";

const UpdateSubscriptionForm: React.FC<{
    subscription: Subscription;
    setUpdateSubscription: Dispatch<SetStateAction<Subscription | undefined>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshSubscriptions: () => Promise<void>
}> = (props) => {
    const {subscription, setUpdateSubscription, setToggleUpdate, onRefreshSubscriptions} = props;
    const {showError, showAlert} = useSnackbar();

    const [fee, setFee] = useState<number>(subscription.fee);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateSubscriptionHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedSubscription: Subscription = {
            fee: fee
        } as Subscription;

        try {
            await subscriptionService.updateSubscription(subscription._id, editedSubscription);
            showAlert("Payment updated successfully!", "success");
            await onRefreshSubscriptions();
            setToggleUpdate(false);
            setUpdateSubscription(undefined);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateSubscription(undefined);
    };

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 w-14 h-14">
                        <img className="w-full h-full border rounded-full"
                             src={subscription.member.avatar}
                             alt={subscription.member.fullName}/>
                    </div>
                    <div className="ml-3">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{subscription.member._id}</p>
                        <p className="text-gray-900">{subscription.member.fullName}</p>
                    </div>
                </div>

                <Form className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10" onSubmit={updateSubscriptionHandler}>
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

export default UpdateSubscriptionForm;