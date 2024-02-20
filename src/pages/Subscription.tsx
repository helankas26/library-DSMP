import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import SubscriptionList from "../components/subscription/SubscriptionList.tsx";

const Subscription: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Subscription"}/>
            </div>
            <DashboardContext>
                <SubscriptionList/>
            </DashboardContext>
        </>
    );
}

export default Subscription;