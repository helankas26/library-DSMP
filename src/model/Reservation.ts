import Book from "./Book.ts";
import Profile from "./Profile.ts";

interface Reservation {
    id: string;
    book: Book;
    member: Profile;
    status: 'RESERVED' | 'CANCELLED' | 'BORROWED' | 'EXPIRED';
    reservationAt: Date;
    dueAt: Date;
}

export default Reservation;