import React from "react";

const BookDetails: React.FC = () => {
    return (
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full lg:sticky top-28 sm:flex gap-2">
                    <img src="https://m.media-amazon.com/images/I/81wAshyxQyL._AC_UF1000,1000_QL80_.jpg"
                         alt="Product"
                         className="w-full rounded object-cover border"/>
                </div>
                <div>
                    <h2 className="text-4xl font-medium text-gray-800">Head first Java</h2>
                    <div className="mt-8">
                        <p className="text-gray-800">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae culpa dolore error
                            inventore iure non omnis perferendis provident quia ratione reprehenderit, sed soluta
                            tenetur totam unde voluptatem. Ducimus, voluptatem.
                        </p>
                    </div>
                    <div className="mt-8">
                        <span className="bg-green-500 text-gray-50 py-1 px-4 rounded-3xl">Available</span>
                        <span className="bg-red-500 text-gray-50 py-1 px-4 rounded-3xl">Not Available</span>
                    </div>
                    <div className="mt-8">
                        <button type="button"
                                className="w-full mt-4 px-4 py-3 bg-[#FB641B] hover:bg-[#e65610] text-white font-medium rounded">
                            Reserve Your Copy
                        </button>
                    </div>
                    <div className="mt-8 relative overflow-x-auto shadow-xl">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
                            <tr className="border-b">
                                <th className="px-6 py-3 text-xs text-gray-700 uppercase">
                                    Title
                                </th>
                                <td className="px-6 py-3">
                                    Black
                                </td>
                            </tr>
                            <tr className="border-b bg-gray-50">
                                <th className="px-6 py-3 text-xs text-gray-700 uppercase bg-gray-50">
                                    Authors
                                </th>
                                <td className="px-6 py-3">
                                    Black
                                </td>
                            </tr>
                            <tr className="border-b">
                                <th className="px-6 py-3 text-xs text-gray-700 uppercase">
                                    Category
                                </th>
                                <td className="px-6 py-3">
                                    Black
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;