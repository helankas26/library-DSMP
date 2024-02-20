import Profile from "./Profile.tsx";

interface Subscription {
    id: string;
    fee: number;
    paidFor: string;
    member: Profile;
    librarian: Profile;
    paidAt: Date;
    updateAt: Date;
}

export default Subscription;