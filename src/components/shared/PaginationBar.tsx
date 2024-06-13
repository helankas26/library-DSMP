import React from "react";

const PaginationBar: React.FC<{
    title: string;
    style: string;
    page: number;
    totalCount: number;
    totalPages: number;
    from: number;
    to: number;
    prevPageHandler: () => void;
    nextPageHandler: () => void
}> = (props) => {
    const {title, style, page, totalCount, totalPages, from, to, prevPageHandler, nextPageHandler} = props;

    return (
        <div className={`inline-block min-w-full border shadow rounded-lg overflow-hidden ${style}`}>
            <div className="px-5 py-5 bg-white rounded-lg flex flex-col items-center">
                <span className="text-xs sm:text-sm text-gray-900">
                    Showing {from} to {to} of {totalCount} {title || "entries"}
                </span>
                <div className="inline-flex mt-2 gap-3">
                    <button
                        disabled={page <= 1}
                        onClick={prevPageHandler}
                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-l disabled:bg-gray-500">
                        Prev
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={nextPageHandler}
                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-r disabled:bg-gray-500">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaginationBar;