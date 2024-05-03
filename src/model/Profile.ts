interface Profile {
    _id: string;
    fullName: string;
    avatar: string;
    email: string;
    telNo: string;
    address: string;
    type: 'LIBRARIAN' | 'MEMBER';
    reservationCount: number;
    borrowCount: number;
    createdAt: Date;
}


export default Profile;