import Book from "./Book.ts";
import Profile from "./Profile.ts";
import ReservationStatus from "../enum/ReservationStatus.ts";

interface Reservation {
    _id: string;
    book: Book;
    member: Profile;
    status: ReservationStatus.Reserved | ReservationStatus.Cancelled | ReservationStatus.Borrowed | ReservationStatus.Expired;
    reservationAt: Date;
    dueAt: Date;
}

export default Reservation;