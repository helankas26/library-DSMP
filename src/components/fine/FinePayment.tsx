import React from "react";
import PayButton from "../shared/PayButton.tsx";

const FinePayment: React.FC = () => {
    return (
        <div className="min-w-full border rounded mb-4">
            <div
                className="m-4 pb-1 overflow-x-auto">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12">
                        <img className="w-full h-full border rounded-full"
                             src="https://avatars.githubusercontent.com/u/61771292?v=4"
                             alt=""/>
                    </div>
                    <div className="ml-3 text-sm">
                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900">#972701564</p>
                        <p className="text-gray-900">Helanka Singhapurage</p>
                    </div>
                </div>
                <div className="mt-3 flex flex-col">
                    <div
                        className="py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg w-full">
                        <div className="flex items-center justify-between w-full">
                            <div>Payment to Front</div>
                            <div>$264.00</div>
                        </div>
                    </div>
                    <div
                        className="py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg w-full">
                        <div className="flex items-center justify-between w-full">
                            <div>Tax fee</div>
                            <div>$52.8</div>
                        </div>
                    </div>
                    <div
                        className="py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg w-full">
                        <div className="flex items-center justify-between w-full">
                            <div>Total Amount</div>
                            <div>$316.8</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mb-4">
                <div className="mr-4">
                    <PayButton/>
                </div>
            </div>
        </div>
    );
}

export default FinePayment;