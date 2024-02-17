import React from "react";
import ConfigCard from "./ConfigCard.tsx";
import ConfigUpdateCard from "./ConfigUpdateCard.tsx";

const ConfigView: React.FC = () => {
    return (
        <>
            <div className="pb-6">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Configurations</h2>
                    <span className="text-xs">All Configuration</span>
                </div>
            </div>

            <div className="border rounded mb-6 flex justify-center">
                <ConfigUpdateCard title={"Admission"}/>
            </div>

            <div
                className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-1 sm:py-4 overflow-x-auto">
                <div className="flex flex-wrap justify-center min-w-full shadow rounded-lg overflow-hidden">
                    <ConfigCard title={"Admission"}/>
                    <ConfigCard title={"Subscription"}/>
                    <ConfigCard title={"Fine"}/>
                    <ConfigCard title={"No of Reservation"}/>
                    <ConfigCard title={"No of Borrow"}/>
                    <ConfigCard title={"Borrowable Date"}/>
                </div>
            </div>
        </>
    );
}

export default ConfigView;