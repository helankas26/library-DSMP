import React, {ChangeEvent, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import Profile from "../../model/Profile.ts";
import profileService from "../../services/api/profile.ts";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";

const ProfileList: React.FC = () => {
    const size: number = 20;
    const scrollToTop = useScrollToTop();
    const {showError} = useSnackbar();

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);

    const loadProfiles = useCallback(async () => {
        try {
            const response = await profileService.findAllProfilesWithPagination(page, size);

            const {profiles, from, to, totalCount, totalPages} = response.data;
            setProfiles(profiles);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, searchText]);


    const searchProfiles = useCallback(async () => {
        try {
            const response = await profileService.findAllProfilesBySearchWithPagination(searchText, page, size);

            const {profiles, from, to, totalCount, totalPages} = response.data;
            setProfiles(profiles);
            setFrom(from);
            setTo(to);
            setTotalCount(totalCount);
            setTotalPages(totalPages);
            setDelay(0);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    }, [page, searchText]);

    const searchTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setPage(1);
        setDelay(750);
    };

    const nextPage = async () => {
        if (page < totalPages) {
            setPage((prevState) => prevState + 1);
        }
    };

    const prevPage = async () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadProfiles();
        }
    }, [loadProfiles]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchProfiles();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchProfiles]);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Profiles</h2>
                    <span className="text-xs">All Profile</span>
                </div>
                <div className="w-full flex bg-gray-50 items-center p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"/>
                    </svg>
                    <input className="bg-gray-50 outline-none ml-1 block w-full"
                           type="search"
                           onChange={searchTextChangeHandler}
                           placeholder="Search..."/>
                </div>
            </div>

            <div
                className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-1 sm:py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {isLoading &&
                        <div className="w-full h-[60vh] flex justify-center items-center">
                            <GradientCircularProgress/>
                        </div>
                    }

                    {!isLoading && profiles.length === 0 &&
                        <div className="w-full h-[60vh] flex justify-center items-center">
                            <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                                No profiles were found matching your selection.
                            </p>
                        </div>
                    }

                    {!isLoading && profiles.length > 0 &&
                        <>
                            <table className="min-w-full leading-normal">
                                <thead
                                    className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                                    <tr>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Profile
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Email
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Tel No
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Address
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Type
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            View Option
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Update Option
                                        </th>
                                        <th className="pl-5 pr-2 py-3 font-semibold">
                                            Delete Option
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white text-sm">
                                    {profiles.map((profile) => (
                                        <tr key={profile._id} className="border-b border-gray-200">
                                            <td className="pl-5 pr-2 py-1">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-14 h-14">
                                                        <img className="w-full h-full border rounded-full"
                                                             src={profile.avatar}
                                                             alt={profile.fullName}/>
                                                    </div>
                                                    <div className="ml-3 w-full">
                                                        <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900 whitespace-nowrap">#{profile._id}</p>
                                                        <p className="text-gray-900 whitespace-nowrap">{profile.fullName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-5 pr-2 py-1">
                                                <p className="text-gray-900 whitespace-nowrap">{profile.email}</p>
                                            </td>
                                            <td className="pl-5 pr-2 py-1">
                                                <p className="text-gray-900 whitespace-nowrap">{profile.telNo}</p>
                                            </td>
                                            <td className="pl-5 pr-2 py-1 max-w-[280px] overflow-hidden">
                                                <p className="text-gray-900 truncate">{profile.address}</p>
                                            </td>
                                            <td className="pl-5 pr-2 py-1">
                                                <p className="text-gray-900 whitespace-nowrap">{profile.type}</p>
                                            </td>
                                            <td className="px-5 py-1">
                                                <ViewButton/>
                                            </td>
                                            <td className="px-5 py-1">
                                                <UpdateButton/>
                                            </td>
                                            <td className="px-5 py-1">
                                                <DeleteButton/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="px-5 py-5 bg-white border-t flex flex-col items-center">
                                <span className="text-xs sm:text-sm text-gray-900">
                                    Showing {from} to {to} of {totalCount} profiles
                                </span>
                                <div className="inline-flex mt-2 gap-3">
                                    <button
                                        disabled={page <= 1}
                                        onClick={prevPage}
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-l disabled:bg-gray-500">
                                        Prev
                                    </button>
                                    <button
                                        disabled={page >= totalPages}
                                        onClick={nextPage}
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 active:bg-indigo-600 font-semibold py-2 px-4 rounded-r disabled:bg-gray-500">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    );
}

export default ProfileList;