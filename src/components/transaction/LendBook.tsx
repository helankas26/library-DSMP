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
    const [profile, setProfile] = useState<Profile | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
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
            setProfile(profile);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadMemberCurrentLoans = useCallback(async () => {
        if (profile) {
            try {
                const response = await profileService.getMemberCurrentLoansById(profile._id);
                const {transactions} = response.data.profile;
                setTransactions(transactions);
            } catch (error: any) {
                showError(error);
            }
        } else {
            setTransactions([]);
        }
    }, [profile]);

    const loadMemberAvailableReservations = useCallback(async () => {
        if (profile) {
            try {
                const response = await profileService.getMemberAvailableReservationsById(profile._id);
                const {reservations} = response.data.profile;
                setReservations(reservations);
            } catch (error: any) {
                showError(error);
            }
        } else {
            setReservations([]);
        }
    }, [profile]);

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    useEffect(() => {
        if (config && profile) {
            const maxBorrow = config.noOfBorrow?.count || 0;
            const borrowed = profile.borrowCount || 0;
            const calculatedLimit = maxBorrow - borrowed;
            setLimit(calculatedLimit > 0 ? calculatedLimit : 0);
        } else {
            setLimit(undefined);
        }

        setBooks([]);
    }, [config, profile]);

    useEffect(() => {
        loadMemberCurrentLoans();
    }, [loadMemberCurrentLoans]);

    useEffect(() => {
        loadMemberAvailableReservations();
    }, [loadMemberAvailableReservations]);

    return (
        <>
            <SelectProfile profile={profile} setProfile={setProfile} fetchProfile={fetchProfileHandler}/>

            {transactions.length > 0 && (
                <CurrentLoans
                    transactions={transactions}
                    profile={profile!}
                    fetchProfile={fetchProfileHandler}
                />
            )}

            {reservations.length > 0 && (
                <AvailableReservations
                    reservations={reservations}
                    limit={limit}
                    books={books}
                    setBooks={setBooks}
                    onRefreshReservations={loadMemberAvailableReservations}
                />
            )}

            <SelectBook limit={limit} profile={profile} setProfile={setProfile} books={books} setBooks={setBooks}/>
        </>
    );
}

export default LendBook;