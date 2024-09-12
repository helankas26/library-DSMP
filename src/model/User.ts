import Profile from "./Profile.ts";
import UserRole from "../enum/UserRole.ts";

interface User {
    _id: string;
    username: string;
    profile: Profile;
    role: UserRole.Admin | UserRole.User;
    createdAt: Date;
    passwordChangedAt: Date;
}

export default User;