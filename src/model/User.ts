import Profile from "./Profile.ts";

interface User {
    id: string;
    username: string;
    profile: Profile;
    role: 'USER' | 'ADMIN';
    createdAt: Date;
    passwordChangedAt: Date;
}

export default User;