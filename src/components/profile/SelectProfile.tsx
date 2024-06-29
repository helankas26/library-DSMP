import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

import ComboboxSingleSelect from "../shared/ComboboxSingleSelect.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import profileService from "../../services/api/profile.ts";
import Profile from "../../model/Profile.ts";

const SelectProfile: React.FC<{
    profile: Profile | null;
    setProfile: Dispatch<SetStateAction<Profile | null>>;
    fetchProfile: (id: string) => Promise<void>
}> = (props) => {
    const {profile, setProfile, fetchProfile} = props;
    const {showError} = useSnackbar();

    const [registrationNo, setRegistrationNo] = useState<string>('');
    const [profilesList, setProfilesList] = useState<Profile[]>([]);

    const loadProfilesList = useCallback(async () => {
        try {
            const response = await profileService.findAllMembers();

            const {profiles} = response.data;
            const sortedProfiles = profiles.sort((a, b) => a.fullName.localeCompare(b.fullName));
            setProfilesList(sortedProfiles);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const searchByRegistrationNoHandler = useCallback(async () => {
        if (registrationNo.length === 10) {
            await fetchProfile(registrationNo);
        }
    }, [registrationNo]);

    const profileSelectionHandler = useCallback(async (selectedProfile: Profile) => {
        setRegistrationNo('');
        await fetchProfile(selectedProfile._id);
    }, []);

    useEffect(() => {
        loadProfilesList();
    }, [loadProfilesList]);

    useEffect(() => {
        searchByRegistrationNoHandler();
    }, [searchByRegistrationNoHandler]);

    useEffect(() => {
        if (!registrationNo || registrationNo.length !== 10) {
            setProfile(null);
        }
    }, [registrationNo]);

    return (
        <div className="min-w-full border rounded mb-4">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-2.5">
                <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
                    <div className="w-full">
                        <label htmlFor="regNo"
                               className="block text-gray-600 text-sm font-semibold mb-2">Reg No.</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="regNo"
                            type="search"
                            value={registrationNo}
                            onChange={(e) => {
                                setRegistrationNo(e.target.value);
                            }}
                            placeholder="Search by Reg No."/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="profile"
                               className="block text-gray-600 text-sm font-semibold mb-2">By Name</label>
                        <ComboboxSingleSelect
                            id={"profile"}
                            objects={profilesList}
                            displayField={"fullName"}
                            selectedObject={profile}
                            setSelectedObject={profileSelectionHandler}
                        />
                    </div>
                </div>

                {profile &&
                    <div className="flex items-center justify-center">
                        <div
                            className="w-full sm:w-2/3 lg:w-1/3 bg-white p-3 rounded-xl shadow-xl border flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
                            <div className="flex space-x-6 items-center">
                                <img className="w-auto h-24 rounded-full"
                                     src={profile?.avatar}
                                     alt={profile?.fullName}/>
                                <div>
                                    <p className="text-gray-900 font-semibold text-base">{profile?.fullName}</p>
                                    <p className="bg-gray-200 px-2 text-center rounded font-semibold text-sm text-gray-900">#{profile?._id}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 items-center">
                                <button
                                    className="bg-gray-300 rounded-md py-2 px-1 flex items-center transition duration-150 hover:bg-gray-400 active:bg-gray-300 shadow focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        setProfile(null);
                                        setRegistrationNo('');
                                    }}>
                                    <CloseIcon fontSize="small" className="text-gray-900"/>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default SelectProfile;