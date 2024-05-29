import React from "react";

const TitleBar: React.FC<{ title: string }> = (props) => {
    const {title} = props;

    return (
        <div
            className="py-1.5 px-2 w-full bg-white rounded-t-md border-b border-b-gray-300">
            <div className="px-2 font-semibold text-xl text-gray-600">
                {title}
            </div>
        </div>
    );
}

export default TitleBar;