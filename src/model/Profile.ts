import Transaction from "./Transaction.ts";
import Reservation from "./Reservation.ts";
import ProfileType from "../enum/ProfileType.ts";

interface Profile {
    _id: string;
    fullName: string;
    avatar: string;
    email: string;
    telNo: string;
    address: string;
    type: ProfileType.Librarian | ProfileType.Member;
    paymentStatus: number;
    reservationCount: number;
    borrowCount: number;
    transactions: Transaction[];
    reservations: Reservation[];
    createdAt: Date;
}

export default Profile;