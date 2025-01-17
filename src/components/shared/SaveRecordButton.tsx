import React from "react";

const SaveRecordButton: React.FC<{ model: string; isSubmitting: boolean }> = (props) => {
    const {model, isSubmitting} = props;

    return (
        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
            type="submit"
            disabled={isSubmitting}>
            {!isSubmitting && (`Save ${model}`)}
            {isSubmitting && 'Saving . . .'}
        </button>
    );
}

export default SaveRecordButton;