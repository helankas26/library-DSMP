import React from "react";

const CancelButton: React.FC<{ isUpdating: boolean; onCancel: () => void }> = (props) => {
    const {isUpdating, onCancel} = props;

    return (
        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-500"
            type="button"
            hidden={isUpdating}
            onClick={() => {
                onCancel();
            }}>
            Cancel
        </button>
    );
}

export default CancelButton;