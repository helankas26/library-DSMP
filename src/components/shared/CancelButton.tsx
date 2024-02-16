import React from "react";

const CancelButton: React.FC = () => {

    return (

        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow border border-red-500 transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500"
            type="submit">
            Cancel
        </button>
    );
}

export default CancelButton;