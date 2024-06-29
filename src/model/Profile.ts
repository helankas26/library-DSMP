import Transaction from "./Transaction.ts";
import Reservation from "./Reservation.ts";

interface Profile {
    _id: string;
    fullName: string;
    avatar: string;
    email: string;
    telNo: string;
    address: string;
    type: 'LIBRARIAN' | 'MEMBER';
    paymentStatus: number;
    reservationCount: number;
    borrowCount: number;
    transactions: Transaction[];
    reservations: Reservation[];
    createdAt: Date;
}

export default Profile;