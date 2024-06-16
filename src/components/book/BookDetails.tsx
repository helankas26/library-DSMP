import React from "react";

import Book from "../../model/Book.ts";

const BookDetails: React.FC<{ record: Book }> = (props) => {
    const {record: book} = props;

    return (
        book && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center">
                        <img className="w-auto h-36 rounded-lg" src={book.cover}/>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full h-72 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="id"
                                   className="w-full text-gray-600 font-semibold">ID</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="id"
                                type="text"
                                value={book._id}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="title"
                                   className="w-full text-gray-600 font-semibold">Title</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                value={book.title}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="edition"
                                   className="w-full text-gray-600 font-semibold">Edition</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="edition"
                                type="text"
                                value={book.edition}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="authors"
                                   className="w-full text-gray-600 font-semibold">Authors</label>
                            <div className="w-full flex flex-col gap-2">
                                {book.authors.length === 0 &&
                                    <p className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">Not available</p>
                                }

                                {book.authors.map((author) => (
                                    <p key={author._id}
                                       className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">{author.name}</p>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="category"
                                   className="w-full text-gray-600 font-semibold">Category</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="category"
                                type="text"
                                value={book.category?.categoryName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="noOfCopies"
                                   className="w-full text-gray-600 font-semibold">No of Copies</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="noOfCopies"
                                type="number"
                                value={book.noOfCopies}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="availableCount"
                                   className="w-full text-gray-600 font-semibold">Available Count</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="availableCount"
                                type="number"
                                value={book.availableCount}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="description"
                                   className="w-full text-gray-600 font-semibold">Description</label>
                            <textarea
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="description"
                                rows={4}
                                value={book.description}
                                disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default BookDetails;