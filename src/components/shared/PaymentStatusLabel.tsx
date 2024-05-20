import React from "react";

const PaymentStatusLabel: React.FC<{ paymentStatus: number }> = (props) => {
    const {paymentStatus} = props;
    let labelColor: string = 'text-white bg-green-400';

    if (paymentStatus > 1) {
        labelColor = 'text-white bg-red-500';
    }

    return (
        <span
            className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-bold leading-none rounded-full ${labelColor}`}>
            {paymentStatus}
        </span>
    );
}

export default PaymentStatusLabel;