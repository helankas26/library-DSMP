import React from "react";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import TransactionCard from "../components/core/dashboard-context/TransactionCard.tsx";
import SubscriptionCard from "../components/core/dashboard-context/SubscriptionCard.tsx";
import ReservationCard from "../components/core/dashboard-context/ReservationCard.tsx";

const DashboardMember: React.FC = () => {
    return (
        <DashboardContext>
            <div className="flex items-center justify-center">
                <div
                    className="w-full sm:w-2/3 lg:w-1/3 bg-white p-3 rounded-xl shadow-xl border sm:mb-6">
                    <div className="flex space-x-6 items-center">
                        <img src="https://avatars.githubusercontent.com/u/61771292?v=4"
                             className="w-auto h-24 rounded-lg"/>
                        <div>
                            <p className="text-gray-900 font-semibold text-base">Helanka Singhapurage</p>
                            <p className="bg-gray-200 px-2 text-center rounded font-semibold text-sm text-gray-900">#972701564</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="bg-slate-200 rounded-lg w-full">
                    <div className="m-4 mb-0 xl:mb-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <TransactionCard/>
                            <SubscriptionCard/>
                            <ReservationCard/>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContext>
    );
}

export default DashboardMember;