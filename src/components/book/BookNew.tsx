import React from "react";
import SaveRecordButton from "../shared/SaveRecordButton.tsx";


const BookNew: React.FC = () => {
    return (

        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex justify-center">
                    <div className="flex-shrink-0 w-32 h-36">
                        <img className="w-full h-full border rounded-md"
                             src="https://m.media-amazon.com/images/I/81wAshyxQyL._AC_UF1000,1000_QL80_.jpg"
                             alt=""/>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-evenly flex-wrap lg:flex-nowrap">
                    <div className="font-[sans-serif] w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <label className="text-sm text-black mb-2 block">Upload cover</label>
                        <input type="file"
                               accept="image/jpeg, image/png"
                               className="w-full text-black text-sm bg-white border border-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"/>
                        <p className="text-xs text-gray-400 mt-2">JPEG, JPG and PNG are Allowed.</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <label htmlFor="title"
                               className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
                        <input type="text" id="title" placeholder="Enter book title"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <label htmlFor="edition"
                               className="block text-gray-600 text-sm font-semibold mb-2">Edition</label>
                        <input type="text" id="edition" placeholder="Enter author name"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <label htmlFor="noOfCopies"
                               className="block text-gray-600 text-sm font-semibold mb-2">No of Copies</label>
                        <input type="number" id="noOfCopies" placeholder="Enter author name"
                               className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full">
                        <label htmlFor="description"
                               className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                        <textarea id="message"
                                  className="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                  placeholder="Write description here..."></textarea>

                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full flex gap-5">
                        <SaveRecordButton model={'Book'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookNew;