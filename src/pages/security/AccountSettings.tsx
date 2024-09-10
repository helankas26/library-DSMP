import React, {useCallback, useEffect, useState} from "react";
import {Box, Tabs, Tab, useMediaQuery} from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';

import CustomTabPanel from "../../components/shared/CustomTabPanel.tsx";
import profileService from "../../services/api/profile.ts";
import userService from "../../services/api/user.ts";
import Profile from "../../model/Profile.ts";
import User from "../../model/User.ts";
import ProfileUpdateLoggedUser from "../../components/profile/ProfileUpdateLoggedUser.tsx";
import UsernameUpdateLoggedUser from "../../components/user/UsernameUpdateLoggedUser.tsx";
import ChangePasswordLoggedUser from "../../components/user/ChangePasswordLoggedUser.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import GradientCircularProgress from "../../components/shared/GradientCircularProgress.tsx";

const AccountSettings: React.FC = () => {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const {showError} = useSnackbar();

    const [profile, setProfile] = useState<Profile>();
    const [user, setUser] = useState<User>();
    const [value, setValue] = React.useState<number>(1);

    const loadingIndicator: React.JSX.Element = (
        <div className="w-full h-[62vh] flex justify-center items-center">
            <GradientCircularProgress/>
        </div>
    );

    const loadAuthUserProfile = useCallback(async () => {
        try {
            const response = await profileService.findProfileByAuthUser();

            const {profile} = response.data;
            setProfile(profile);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const loadAuthUser = useCallback(async () => {
        try {
            const response = await userService.findUserByAuthUser();

            const {user} = response.data;
            setUser(user);
        } catch (error: any) {
            showError(error);
        }
    }, []);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        loadAuthUserProfile();
        loadAuthUser();
    }, [loadAuthUserProfile, loadAuthUser]);

    return (
        <>
            <div className="sticky top-0 z-50">
                <div
                    className="py-1.5 px-2 w-full bg-white rounded-t-md border-b border-b-gray-300">
                    <div className="px-2 font-semibold text-lg text-gray-600">Account Settings</div>
                </div>
            </div>

            <div className="bg-white w-full h-full overflow-hidden overflow-y-auto no-scrollbar">
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            variant={isSmallScreen ? 'scrollable' : 'fullWidth'}
                        >
                            <Tab icon={<AccountCircleRoundedIcon fontSize="large" color="inherit"/>}
                                 iconPosition="start" label="Profile" value={1}/>
                            <Tab icon={<AdminPanelSettingsRoundedIcon fontSize="large" color="inherit"/>}
                                 iconPosition="start" label="User" value={2}/>
                            <Tab icon={<PasswordRoundedIcon fontSize="large" color="inherit"/>}
                                 iconPosition="start" label="Change Password" value={3}/>
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={1}>
                        {profile ? <ProfileUpdateLoggedUser profile={profile}/> : loadingIndicator}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        {profile && user ? <UsernameUpdateLoggedUser profile={profile} user={user}/> : loadingIndicator}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        {profile ? <ChangePasswordLoggedUser profile={profile}/> : loadingIndicator}
                    </CustomTabPanel>
                </Box>
            </div>
        </>
    );
}

export default AccountSettings;