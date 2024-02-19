import React from "react";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import RevenueCard from "../components/core/dashboard-context/RevenueCard.tsx";
import ReservationCard from "../components/core/dashboard-context/ReservationCard.tsx";
import TransactionCard from "../components/core/dashboard-context/TransactionCard.tsx";
import SubscriptionCard from "../components/core/dashboard-context/SubscriptionCard.tsx";

const DashboardLibrarian: React.FC = () => {
    return (
        <DashboardContext>
            <div className="flex flex-col gap-4">
                <div className="bg-sky-100 rounded-lg w-full">
                    <div className="m-4 mb-0 xl:mb-4 flex flex-col lg:flex-row lg:gap-4">
                        <RevenueCard title={'Admission'} type={'Today'} amount={3000}/>
                        <RevenueCard title={'Fine'} type={'Today'} amount={3000}/>
                        <RevenueCard title={'Subscription'} type={'Today'} amount={3000}/>
                        <RevenueCard title={'Total'} type={'Today'} amount={3000}/>
                    </div>
                </div>

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

export default DashboardLibrarian;