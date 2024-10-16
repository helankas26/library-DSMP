import React, {useCallback, useEffect, useState} from "react";

import SelectProfile from "../profile/SelectProfile.tsx";
import CurrentLoans from "./CurrentLoans.tsx";
import AvailableReservations from "../reservation/AvailableReservations.tsx";
import SelectBook from "../book/SelectBook.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import configService from "../../services/api/config.ts";
import profileService from "../../services/api/profile.ts";
import Profile from "../../model/Profile.ts";
import Book from "../../model/Book.ts";
import Config from "../../model/Config.ts";
import Transaction from "../../model/Transaction.ts";
import Reservation from "../../model/Reservation.ts";

const LendBook: React.FC = () => {
    const {showError} = useSnackbar();

    const [config, setConfig] = useState<Config>();
    const [limit, setLimit] = useState<number>();
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const loadConfig = useCallback(async () => {
        try {
            const response = await configService.getConfig();

            const {config} = response.data;
            setConfig(config);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const fetchProfileHandler = useCallback(async (id: string) => {
        try {
            const response = await profileService.findProfileById(id);
            const {profile} = response.data;
            setSelectedProfile(profile);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadMemberCurrentLoans = useCallback(async () => {
        if (selectedProfile) {
            try {
                const response = await profileService.getMemberCurrentLoansById(selectedProfile._id);
                const {transactions} = response.data.profile;
                setTransactions(transactions);
            } catch (error: any) {
                showError(error);
            }
        } else {
            setTransactions([]);
        }
    }, [selectedProfile]);

    const loadMemberAvailableReservations = useCallback(async () => {
        if (selectedProfile) {
            try {
                const response = await profileService.getMemberAvailableReservationsById(selectedProfile._id);
                const {reservations} = response.data.profile;
                setReservations(reservations);
            } catch (error: any) {
                showError(error);
            }
        } else {
            setReservations([]);
        }
    }, [selectedProfile]);

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    useEffect(() => {
        if (config && selectedProfile) {
            const maxBorrow = config.noOfBorrow?.count || 0;
            const borrowed = selectedProfile.borrowCount || 0;
            const calculatedLimit = maxBorrow - borrowed;
            setLimit(calculatedLimit > 0 ? calculatedLimit : 0);
        } else {
            setLimit(undefined);
        }

        setSelectedBooks([]);
    }, [config, selectedProfile]);

    useEffect(() => {
        loadMemberCurrentLoans();
    }, [loadMemberCurrentLoans]);

    useEffect(() => {
        loadMemberAvailableReservations();
    }, [loadMemberAvailableReservations]);

    return (
        <>
            <SelectProfile
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                fetchProfile={fetchProfileHandler}
            />

            {transactions.length > 0 && (
                <CurrentLoans
                    transactions={transactions}
                    selectedProfile={selectedProfile!}
                    fetchProfile={fetchProfileHandler}
                />
            )}

            {reservations.length > 0 && (
                <AvailableReservations
                    reservations={reservations}
                    limit={limit}
                    selectedBooks={selectedBooks}
                    setSelectedBooks={setSelectedBooks}
                    onRefreshReservations={loadMemberAvailableReservations}
                />
            )}

            <SelectBook
                limit={limit}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                selectedBooks={selectedBooks}
                setSelectedBooks={setSelectedBooks}
            />
        </>
    );
}

export default LendBook;