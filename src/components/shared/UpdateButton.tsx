import React from "react";

const UpdateButton: React.FC = () => {
    return (
        <button
            className="px-4 py-2 font-semibold text-orange-900 transition duration-150 bg-orange-100 hover:bg-orange-200 active:bg-orange-300 active:bg-opacity-75 leading-tight rounded shadow"
            type="button">
            Update
        </button>
    );
}

export default UpdateButton;