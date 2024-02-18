import React from "react";
import SelectProfile from "../profile/SelectProfile.tsx";
import CurrentLoans from "./CurrentLoans.tsx";
import AvailableReservations from "../reservation/AvailableReservations.tsx";
import SelectBook from "../book/SelectBook.tsx";

const LendBook: React.FC = () => {
    return (
        <>
            <SelectProfile/>
            <CurrentLoans/>
            <AvailableReservations/>
            <SelectBook/>
        </>
    );
}

export default LendBook;