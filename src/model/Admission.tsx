import Profile from "./Profile.tsx";

interface Admission {
    id: string;
    fee: number;
    member: Profile;
    librarian: Profile;
    createdAt: Date
}

export default Admission;