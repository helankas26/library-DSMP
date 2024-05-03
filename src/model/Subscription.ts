import Profile from "./Profile.ts";

interface Subscription {
    _id: string;
    fee: number;
    paidFor: string;
    member: Profile;
    librarian: Profile;
    paidAt: Date;
    updateAt: Date;
}

export default Subscription;