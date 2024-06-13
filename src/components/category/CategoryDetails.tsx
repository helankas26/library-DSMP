import React from "react";

import Category from "../../model/Category.ts";

const CategoryDetails: React.FC<{ record: Category }> = (props) => {
    const {record: category} = props;

    return (
        category && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div
                        className="flex flex-col gap-3 py-3 px-4 text-sm border rounded-lg w-full h-72 overflow-auto">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="id"
                                   className="w-full text-gray-600 font-semibold">ID</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="id"
                                type="text"
                                value={category._id}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="categoryName"
                                   className="w-full text-gray-600 font-semibold">Category Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="categoryName"
                                type="text"
                                value={category.categoryName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="description"
                                   className="w-full text-gray-600 font-semibold">Description</label>
                            <textarea
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="description"
                                rows={4}
                                value={category.description}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="books"
                                   className="w-full text-gray-600 font-semibold">Books</label>
                            <div className="w-full flex flex-col gap-2">
                                {category.books.length === 0 &&
                                    <p className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">Not available</p>
                                }

                                {category.books.map((book) => (
                                    <p key={book._id}
                                       className="w-full pl-2.5 rounded text-gray-700 border border-gray-300 bg-gray-50">{`${book.title} ${book.edition}`}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default CategoryDetails;