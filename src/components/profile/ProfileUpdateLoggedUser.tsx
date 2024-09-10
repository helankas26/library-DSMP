import React, {FormEvent, useEffect, useRef, useState} from "react";
import {Form} from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import profileAvatarImage from "../../assets/profile-avatar.jpg";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Profile from "../../model/Profile.ts";
import profileService from "../../services/api/profile.ts";
import profileFirebaseService from "../../services/firebase/profile.ts";
import {resizeProfileImage} from "../../utils/image-optimizer.ts";

const ProfileUpdateLoggedUser: React.FC<{ profile: Profile }> = (props) => {
    const {profile} = props;
    const {showError, showAlert} = useSnackbar();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatar, setAvatar] = useState<File | null>(null);
    const [fullName, setFullName] = useState<string>(profile.fullName);
    const [telNo, setTelNo] = useState<string>(profile.telNo);
    const [email, setEmail] = useState<string>(profile.email);
    const [address, setAddress] = useState<string>(profile.address);
    const [imagePreview, setImagePreview] = useState<string>(profile.avatar);
    const [currentAvatar, setCurrentAvatar] = useState<string>(profile.avatar);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [shouldCurrentAvatarDelete, setShouldCurrentAvatarDelete] = useState<boolean>(false);

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (file) {
            try {
                const imageFile = await resizeProfileImage(file);
                const preview = URL.createObjectURL(imageFile);
                setImagePreview(preview);
                setAvatar(imageFile);
            } catch (error: any) {
                showError(error);
                setAvatar((prevState) => prevState);
                setImagePreview((prevState) => prevState);
                fileInputRef.current!.value = '';
            }
        }
    };

    const deleteFileInput = async () => {
        setShouldCurrentAvatarDelete(true);
        setCurrentAvatar('');
        setAvatar(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetFileInput = () => {
        setAvatar(null);
        setImagePreview(currentAvatar);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const updateProfileHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);
        let imageURL: string = currentAvatar || profileAvatarImage;

        if (avatar) {
            try {
                imageURL = await profileFirebaseService.uploadProfileImage(avatar);
                await profileFirebaseService.deleteProfileImage(profile.avatar);
            } catch (error: any) {
                showError(error);
            }
        }

        if (shouldCurrentAvatarDelete && !avatar) {
            try {
                await profileFirebaseService.deleteProfileImage(profile.avatar);
            } catch (error: any) {
                showError(error);
            }
        }

        const editedProfile: Profile = {
            fullName: fullName,
            avatar: imageURL,
            email: email,
            telNo: telNo,
            address: address
        } as Profile;

        try {
            await profileService.updateProfileByAuthUser(editedProfile);
            showAlert("Profile updated successfully!", "success");
        } catch (error: any) {
            await profileFirebaseService.deleteProfileImage(imageURL);
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="min-w-full border rounded mb-6">
            <div className="mx-auto max-w-screen-xl p-4 flex flex-col gap-5">
                <div className="flex justify-center">
                    <div className="relative flex-shrink-0 w-36 h-36">
                        <img className="w-full h-full border rounded-full"
                             src={imagePreview || profileAvatarImage}
                             alt="profile photo"/>
                        {imagePreview && currentAvatar && currentAvatar !== profileAvatarImage && (
                            <button
                                className={`absolute cursor-pointer ${avatar ? '-bottom-2 right-6' : 'bottom-2 right-2'} w-8 h-8 shadow border border-red-500 transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-full flex items-center justify-center`}
                                onClick={deleteFileInput}>
                                <DeleteForeverRoundedIcon/>
                            </button>
                        )}
                        {avatar && (
                            <button
                                className={`absolute cursor-pointer ${currentAvatar && currentAvatar !== profileAvatarImage ? 'bottom-6 -right-2 border-yellow-500 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500' : 'bottom-2 right-2 border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-500'} w-8 h-8 shadow border transition duration-150 text-white rounded-full flex items-center justify-center`}
                                onClick={resetFileInput}>
                                <CloseRoundedIcon/>
                            </button>
                        )}
                    </div>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={updateProfileHandler}>
                    <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10">
                        <div className="font-[sans-serif] w-full">
                            <label htmlFor="avatar"
                                   className="text-sm text-black mb-2 block">Upload Avatar</label>
                            <input
                                className="w-full text-black text-sm bg-white border border-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
                                id="avatar"
                                type="file"
                                ref={fileInputRef}
                                onChange={fileChangeHandler}
                                accept="image/jpeg, image/png"/>
                            <p className="text-xs text-gray-400 mt-2">JPEG, JPG and PNG are Allowed.</p>
                        </div>
                        <div className="w-full">
                            <label htmlFor="fullName"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Full Name</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter full name"/>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-5 sm:gap-10">
                        <div className="w-full">
                            <label htmlFor="email"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter email"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="telNo"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Telephone No</label>
                            <input
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="telNo"
                                type="tel"
                                value={telNo}
                                onChange={(e) => {
                                    setTelNo(e.target.value);
                                }}
                                required={true}
                                placeholder="Enter telephone no"/>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-full">
                            <label htmlFor="address"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Address</label>
                            <textarea
                                className="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                required={true}
                                placeholder="Address here..."/>
                        </div>
                    </div>

                    <div className="w-full flex">
                        <UpdateRecordButton isUpdating={isUpdating}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ProfileUpdateLoggedUser;