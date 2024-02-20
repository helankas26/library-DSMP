import Profile from "./Profile.tsx";

interface User {
    id: string;
    username: string;
    profile: Profile;
    role: 'USER' | 'ADMIN';
    createdAt: Date;
    passwordChangedAt: Date;
}

export default User;