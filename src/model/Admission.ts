import Profile from "./Profile.ts";

interface Admission {
    _id: string;
    fee: number;
    member: Profile;
    librarian: Profile;
    createdAt: Date
}

export default Admission;