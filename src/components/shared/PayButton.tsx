import React from "react";

const PayButton: React.FC<{ isPaying: boolean; disabled?: boolean }> = (props) => {
    const {isPaying, disabled} = props;

    return (
        <button
            className="w-[100px] py-2 px-4 font-semibold text-white transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500 leading-tight rounded shadow"
            type="submit"
            disabled={isPaying || disabled}>
            {!isPaying && 'Pay'}
            {isPaying && 'Paying...'}
        </button>
    );
}

export default PayButton;