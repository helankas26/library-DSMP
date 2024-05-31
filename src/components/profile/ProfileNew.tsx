import React, {FormEvent, useEffect, useRef, useState} from "react";
import {Form} from "react-router-dom";

import SaveRecordButton from "../shared/SaveRecordButton.tsx";
import profileAvatarImage from "../../assets/profile-avatar.jpg";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Profile from "../../model/Profile.ts";
import profileService from "../../services/api/profile.ts";
import profileFirebaseService from "../../services/firebase/profile.ts";
import {resizeProfileImage} from "../../utils/image-optimizer.ts";


const ProfileNew: React.FC = () => {
    const {showError, showAlert} = useSnackbar();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatar, setAvatar] = useState<File | null>(null);
    const [fullName, setFullName] = useState<string>('');
    const [telNo, setTelNo] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [type, setType] = useState<'LIBRARIAN' | 'MEMBER'>('MEMBER');
    const [address, setAddress] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (file) {
            try {
                const imageFile = await resizeProfileImage(file);

                // Creates a temporary URL pointing to the file object
                const preview = URL.createObjectURL(imageFile);
                setImagePreview(preview);
                setAvatar(imageFile);

                // Converts the image file to a base64-encoded string
                /*const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    setImagePreview(result);
                };
                reader.readAsDataURL(file);*/
            } catch (error: any) {
                showError(error);
                setAvatar(null);
                setImagePreview('');
                fileInputRef.current!.value = '';
            }
        }
    };

    const resetFileInput = () => {
        setAvatar(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveProfileHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);
        let imageURL: string = profileAvatarImage;

        if (avatar) {
            try {
                imageURL = await profileFirebaseService.uploadProfileImage(avatar);
            } catch (error: any) {
                showError(error);
            }
        }

        const profile: Profile = {
            fullName: fullName,
            avatar: imageURL,
            email: email,
            telNo: telNo,
            address: address,
            type: type
        } as Profile;

        try {
            await profileService.createProfile(profile);
            showAlert("profile create successfully!", "success");

            setAvatar(null)
            setFullName('')
            setTelNo('')
            setEmail('')
            setType("MEMBER")
            setAddress('')
            setImagePreview('')
            fileInputRef.current!.value = '';
        } catch (error: any) {
            await profileFirebaseService.deleteProfileImage(imageURL);
            showError(error);
        } finally {
            setType("MEMBER");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // Cleanup function to revoke the object URL
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
                        {avatar && (
                            <button
                                className="absolute cursor-pointer bottom-2 right-2 w-8 h-8 shadow border border-red-500 transition duration-150 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-full flex items-center justify-center"
                                onClick={resetFileInput}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={saveProfileHandler}>
                    <div
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-evenly flex-wrap lg:flex-nowrap">
                        <div className="font-[sans-serif] w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
                            <label
                                htmlFor="avatar"
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
                        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
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
                        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/3">
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

                    <div className="flex flex-col md:flex-row gap-5 items-center md:justify-evenly">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
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

                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full">
                            <label htmlFor="type"
                                   className="block text-gray-600 text-sm font-semibold mb-2">Type</label>
                            <div
                                className="flex justify-center gap-2 border border-gray-300 rounded w-full py-1 px-2 bg-gray-200 text-gray-600">
                                <div className="w-full">
                                    <input
                                        className="peer hidden"
                                        id="member"
                                        type="radio"
                                        value="MEMBER"
                                        name="type"
                                        onChange={() => {
                                            setType("MEMBER");
                                        }}
                                        checked={type === "MEMBER"}/>
                                    <label htmlFor="member"
                                           className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-green-600 peer-checked:font-semibold peer-checked:text-white">MEMBER</label>
                                </div>
                                <div className="w-full">
                                    <input
                                        className="peer hidden"
                                        id="librarian"
                                        type="radio"
                                        value="LIBRARIAN"
                                        name="type"
                                        onChange={() => {
                                            setType("LIBRARIAN");
                                        }}
                                        checked={type === "LIBRARIAN"}/>
                                    <label htmlFor="librarian"
                                           className="block cursor-pointer select-none rounded p-1 text-center peer-checked:bg-red-600 peer-checked:font-semibold peer-checked:text-white">LIBRARIAN</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full">
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

                    <div className="flex justify-center">
                        <div className="w-full sm:w-1/2 md:w-4/5 lg:w-full flex gap-5">
                            <SaveRecordButton model={'Profile'} isSubmitting={isSubmitting}/>
                        </div>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default ProfileNew;