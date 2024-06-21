import Profile from "./Profile.ts";

interface ProfileWithPayment extends Profile {
    fee: number;
    totalAmount: number;
    payments: { index: number, payFor: string }[]
}

export default ProfileWithPayment;
