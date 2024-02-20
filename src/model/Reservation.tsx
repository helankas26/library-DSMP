import Book from "./Book.tsx";
import Profile from "./Profile.tsx";

interface Reservation {
    id: string;
    book: Book;
    member: Profile;
    status: 'RESERVED' | 'CANCELLED' | 'BORROWED' | 'EXPIRED';
    reservationAt: Date;
    dueAt: Date;
}

export default Reservation;