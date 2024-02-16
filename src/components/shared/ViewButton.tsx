import React from "react";

const ViewButton: React.FC = () => {

    return (
        <button
            className="px-4 py-2 font-semibold text-green-900 transition duration-150 bg-green-100 hover:bg-green-200 active:bg-green-300 active:bg-opacity-75 leading-tight rounded shadow"
            type="button">
            View
        </button>
    );
}

export default ViewButton;