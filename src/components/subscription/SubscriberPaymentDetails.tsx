import React, {FormEvent, useEffect, useState} from "react";
import {Form} from "react-router-dom";

import PayButton from "../shared/PayButton.tsx";
import ProfileWithPayment from "../../model/ProfileWithPayment.ts";
import Subscription from "../../model/Subscription.ts";
import subscriptionService from "../../services/api/subscription.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";

const SubscriberPaymentDetails: React.FC<{
    record: ProfileWithPayment;
    onClose: () => Promise<void>
}> = (props) => {
    const {record: profile, onClose} = props;
    const {showError, showAlert} = useSnackbar();

    const [isPaying, setIsPaying] = useState<boolean>(false);
    const [payments, setPayments] = useState<{ index: number, payFor: string }[]>(profile.payments);
    const [activePaymentIndex, setActivePaymentIndex] = useState<number>(0);

    const paymentHandler = async (event: FormEvent, paymentIndex: number) => {
        event.preventDefault();

        setIsPaying(true);

        const subscription: Subscription = {
            member: profile._id
        } as unknown as Subscription;

        try {
            const payment = await subscriptionService.createSubscription(subscription);
            showAlert(`Payment for ${payment.data.subscription.paidFor} successfully!`, "success");

            setPayments((prevState) =>
                prevState.filter((payment) => payment.index !== paymentIndex)
            );
            setActivePaymentIndex((prevIndex) => prevIndex + 1);
        } catch (error: any) {
            showError(error);
        } finally {
            setIsPaying(false);
        }
    };

    useEffect(() => {
        if (!payments.length) {
            setTimeout(() => onClose(), 50);
        }
    }, [payments]);

    return (
        profile && (
            <div className="min-w-full border rounded mb-4">
                <div className="m-4 pb-1 overflow-x-auto">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                            <img className="w-full h-full border rounded-full"
                                 src={profile.avatar}/>
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#{profile._id}</p>
                            <p className="text-gray-900">{profile.fullName}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col border rounded-lg">
                        {payments.map((payment) => (
                            <div key={payment.index}
                                 className="py-2 px-4 text-sm text-gray-800 border-b last:border-b-0 w-full">
                                <div className="flex items-center justify-between w-full">
                                    <p>{payment.payFor}</p>
                                    <p>{profile.fee.toFixed(2)}</p>
                                    <Form onSubmit={(event: FormEvent) => paymentHandler(event, payment.index)}>
                                        <PayButton
                                            isPaying={isPaying && activePaymentIndex === payment.index}
                                            disabled={activePaymentIndex !== payment.index}
                                        />
                                    </Form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}

export default SubscriberPaymentDetails;