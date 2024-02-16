import React from "react";

const SaveRecordButton: React.FC<{ model: string }> = (props) => {

    return (

        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow border border-blue-500 transition duration-150 bg-blue-500 hover:bg-blue-700 active:bg-blue-500"
            type="submit">
            Save {props.model}
        </button>
    );
}

export default SaveRecordButton;