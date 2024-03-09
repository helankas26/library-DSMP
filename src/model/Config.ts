import Profile from "./Profile.ts";

interface Config {
    id: string;
    admission: {
        fee: number;
        librarian: Profile;
        updateAt: Date;
    };
    subscription: {
        fee: number;
        librarian: Profile;
        updateAt: Date;
    };
    fine: {
        fee: number;
        librarian: Profile;
        updateAt: Date;
    };
    noOfReservation: {
        count: number;
        librarian: Profile;
        updateAt: Date;
    };
    noOfBorrow: {
        count: number;
        librarian: Profile;
        updateAt: Date;
    };
    borrowableDate: {
        count: number;
        librarian: Profile;
        updateAt: Date;
    };
    createdAt: Date;
}

export default Config;