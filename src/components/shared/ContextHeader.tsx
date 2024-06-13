import React, {ChangeEvent} from "react";

const ContextHeader: React.FC<{
    title: string;
    description: string;
    elementRef: React.RefObject<HTMLDivElement>;
    searchTextChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}> = (props) => {
    const {title, description, elementRef, searchTextChangeHandler} = props;

    return (
        <div ref={elementRef} className="flex flex-col sm:flex-row sm:items-center justify-between pb-6">
            <div className="w-full">
                <h2 className="text-gray-600 font-semibold">{title}</h2>
                <span className="text-xs">{description}</span>
            </div>
            <div className="w-full flex bg-gray-50 items-center p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                     viewBox="0 0 20 20"
                     fill="currentColor">
                    <path fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"/>
                </svg>
                <input className="bg-gray-50 outline-none ml-1 block w-full"
                       type="search"
                       onChange={searchTextChangeHandler}
                       placeholder="Search..."/>
            </div>
        </div>
    );
}

export default ContextHeader;