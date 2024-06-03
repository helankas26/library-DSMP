import React from "react";

const UpdateRecordButton: React.FC<{ isUpdating: boolean }> = (props) => {
    const {isUpdating} = props;

    return (
        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow transition duration-150 bg-orange-400 hover:bg-orange-500 active:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500"
            type="submit"
            disabled={isUpdating}>
            {!isUpdating && 'Update'}
            {isUpdating && 'Updating . . .'}
        </button>
    );
}

export default UpdateRecordButton;