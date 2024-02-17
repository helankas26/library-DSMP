import React from "react";

const PayButton: React.FC = () => {

    return (

        <button
            className="w-[100px] py-2 px-4 font-semibold text-white transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 leading-tight rounded shadow"
            type="submit">
            Pay
        </button>
    );
}

export default PayButton;