import React from "react";

const ReturnButton: React.FC<{ isReturning: boolean }> = (props) => {
    const {isReturning} = props;

    return (
        <button
            className="px-4 py-2 font-semibold text-white transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 leading-tight rounded shadow disabled:cursor-not-allowed disabled:bg-gray-500"
            type="submit"
            disabled={isReturning}>
            {!isReturning && 'Return'}
            {isReturning && 'Returning...'}
        </button>
    );
}

export default ReturnButton;