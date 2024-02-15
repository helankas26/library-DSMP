import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import TransactionList from "../components/transaction/TransactionList.tsx";

const Transaction: React.FC = () => {
    return (
        <>
            <div className="sticky top-0">
                <TitleBar title={"Transaction"}/>
            </div>
            <DashboardContext>
                <TransactionList/>
            </DashboardContext>
        </>
    );
}

export default Transaction;