import {useEffect} from "react";

import useAuth from "./use-auth.ts";
import useSnackbar from "./use-snackbar.ts";
import profileService from "../services/api/profile.ts";

const useProfile = () => {
    const {auth, dispatchAuth} = useAuth();
    const {showError} = useSnackbar();

    useEffect(() => {
        const findProfileByAuthUser = async () => {
            try {
                const response = await profileService.findProfileByAuthUser();
                const profile = response?.data?.profile;
                dispatchAuth({type: 'SET_PROFILE', auth: {profile: profile}});
            } catch (error: any) {
                showError(error);
            }
        }

        if (auth.accessToken && auth.profile === undefined) {
            findProfileByAuthUser();
        }
    }, [auth]);
}

export default useProfile;