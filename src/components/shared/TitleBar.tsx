import React from "react";

const TitleBar: React.FC<{ title: string }> = (props) => {
    return (
        <div
            className="py-0.5 px-2 w-full bg-white rounded-t-md border-b border-b-gray-400">
            <div className="px-2 font-medium text-xl text-gray-600">
                {props.title}
            </div>
        </div>
    );
}

export default TitleBar;