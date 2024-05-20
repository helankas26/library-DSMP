import React from "react";

const StatusLabel: React.FC<{ status: string }> = (props) => {
    const {status} = props;
    let labelColor: string = '';

    switch (status) {
        case 'BORROWED':
            labelColor = 'text-green-500 bg-green-100';
            break;
        case 'RESERVED':
        case 'RETURNED':
            labelColor = 'text-blue-500 bg-blue-100';
            break;
        case 'CANCELLED':
        case 'OVERDUE':
            labelColor = 'text-red-500 bg-red-100';
            break;
        case 'EXPIRED':
            labelColor = 'text-orange-500 bg-orange-100';
            break;
        default:
            labelColor = 'text-gray-900 bg-gray-100';
            break;
    }

    return (
        <span
            className={`text-center align-baseline inline-flex px-2.5 py-1.5 mr-auto items-center font-semibold leading-none rounded-full ${labelColor}`}>
            {status}
        </span>
    );
}

export default StatusLabel;