import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import profileService from "../../services/api/profile.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Profile from "../../model/Profile.ts";

const ProfileDetails: React.FC<{ id: string; setIsOpen: Dispatch<SetStateAction<boolean>> }> = (props) => {
    const {id, setIsOpen} = props;
    const {showError} = useSnackbar();

    const [profile, setProfile] = useState<Profile>();

    const loadProfileDetails = useCallback(async () => {
        try {
            const response = await profileService.findProfileById(id);

            const {profile} = response.data;
            setProfile(profile);
            setIsOpen(true);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    useEffect(() => {
        setIsOpen(false);
        loadProfileDetails();
    }, [loadProfileDetails]);

    return (
        profile && (
            <div className="min-w-full border rounded">
                <div className="m-4 overflow-x-auto">
                    <div className="flex justify-center">
                        <img
                            className="w-auto h-36 rounded-lg"
                            src={profile.avatar}/>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 py-3 px-4 text-sm border rounded-lg w-full">
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="fullName"
                                   className="w-full text-gray-600 font-semibold">Full Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                value={profile.fullName}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="telNo"
                                   className="w-full text-gray-600 font-semibold">Telephone No</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="telNo"
                                type="text"
                                value={profile.telNo}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="email"
                                   className="w-full text-gray-600 font-semibold">Email</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={profile.email}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="type"
                                   className="w-full text-gray-600 font-semibold">Type</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="type"
                                type="text"
                                value={profile.type}
                                disabled={true}/>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <label htmlFor="address"
                                   className="w-full text-gray-600 font-semibold">Address</label>
                            <textarea
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="address"
                                rows={4}
                                value={profile.address}
                                disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ProfileDetails;