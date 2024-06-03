import React from "react";

const UpdateButton: React.FC<{ id: string; onUpdate: (id: string) => void }> = (props) => {
    const {id, onUpdate} = props;

    return (
        <button
            className="px-4 py-2 font-semibold text-orange-900 transition duration-150 bg-orange-100 hover:bg-orange-200 active:bg-orange-300 active:bg-opacity-75 leading-tight rounded shadow"
            type="button"
            onClick={() => {
                onUpdate(id);
            }}>
            Update
        </button>
    );
}

export default UpdateButton;