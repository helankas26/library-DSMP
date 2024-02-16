import React from "react";

const UpdateRecordButton: React.FC = () => {

    return (

        <button
            className="w-full py-2 px-4 font-semibold text-white rounded shadow border border-orange-400 transition duration-150 bg-orange-400 hover:bg-orange-500 active:bg-orange-400"
            type="submit">
            Update
        </button>
    );
}

export default UpdateRecordButton;