import React from "react";

const DeleteButton: React.FC = () => {
    return (
        <button
            className="px-4 py-2 font-semibold text-red-900 transition duration-150 bg-red-100 hover:bg-red-200 active:bg-red-300 active:bg-opacity-75 leading-tight rounded shadow"
            type="button">
            Delete
        </button>
    );
}

export default DeleteButton;