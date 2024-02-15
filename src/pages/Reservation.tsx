import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import ReservationList from "../components/reservation/ReservationList.tsx";

const Reservation: React.FC = () => {
    return (
        <>
            <div className="sticky top-0">
                <TitleBar title={"Reservations"}/>
            </div>
            <DashboardContext>
                <ReservationList/>
            </DashboardContext>
        </>
    );
}

export default Reservation;