import React, {useCallback, useEffect, useState} from "react";

import DashboardContext from "../components/shared/DashboardContext.tsx";
import RevenueCard from "../components/core/dashboard-context/RevenueCard.tsx";
import ReservationCard from "../components/core/dashboard-context/ReservationCard.tsx";
import TransactionCard from "../components/core/dashboard-context/TransactionCard.tsx";
import SubscriptionCard from "../components/core/dashboard-context/SubscriptionCard.tsx";
import useSnackbar from "../hooks/use-snackbar.ts";
import admissionService from "../services/api/admission.ts";
import fineService from "../services/api/fine.ts";
import subscriptionService from "../services/api/subscription.ts";

const DashboardLibrarian: React.FC = () => {
    const {showError} = useSnackbar();

    const [admissionsCollection, setAdmissionsCollection] = useState<number>(0);
    const [finesCollection, setFinesCollection] = useState<number>(0);
    const [subscriptionsCollection, setSubscriptionsCollection] = useState<number>(0);

    const loadTodayAdmissionsCollection = useCallback(async () => {
        try {
            const response = await admissionService.getTodayAdmissionsCollection();

            const {admissionsCollection} = response.data;
            setAdmissionsCollection(admissionsCollection);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadTodayFinesCollection = useCallback(async () => {
        try {
            const response = await fineService.getTodayFinesCollection();

            const {finesCollection} = response.data;
            setFinesCollection(finesCollection);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadTodaySubscriptionsCollection = useCallback(async () => {
        try {
            const response = await subscriptionService.getTodaySubscriptionsCollection();

            const {subscriptionsCollection} = response.data;
            setSubscriptionsCollection(subscriptionsCollection);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    useEffect(() => {
        loadTodayAdmissionsCollection();
        loadTodayFinesCollection();
        loadTodaySubscriptionsCollection();
    }, [loadTodayAdmissionsCollection, loadTodayFinesCollection, loadTodaySubscriptionsCollection]);

    return (
        <DashboardContext>
            <div className="flex flex-col gap-4">
                <div className="bg-sky-100 rounded-lg w-full">
                    <div className="m-4 mb-0 xl:mb-4 flex flex-col lg:flex-row lg:gap-4">
                        <RevenueCard title={'Admission'} type={'Today'} amount={admissionsCollection}/>
                        <RevenueCard title={'Fine'} type={'Today'} amount={finesCollection}/>
                        <RevenueCard title={'Subscription'} type={'Today'} amount={subscriptionsCollection}/>
                        <RevenueCard title={'Total'} type={'Today'}
                                     amount={admissionsCollection + finesCollection + subscriptionsCollection}/>
                    </div>
                </div>

                <div className="bg-slate-200 rounded-lg w-full">
                    <div className="m-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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