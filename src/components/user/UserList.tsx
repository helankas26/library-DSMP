import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import UserUpdateForm from "./UserUpdateForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import User from "../../model/User.ts";
import userService from "../../services/api/user.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const UserDetails = React.lazy(() => import('./UserDetails.tsx'));

const UserList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateUser, setUpdateUser] = useState<User>();

    const loadUsers = useCallback(async () => {
        try {
            const response = await userService.findAllUsersWithPagination(page, size);

            const {users, from, to, totalCount, totalPages} = response.data;
            setUsers(users);
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


    const searchUsers = useCallback(async () => {
        try {
            const response = await userService.findAllUsersBySearchWithPagination(searchText, page, size);

            const {users, from, to, totalCount, totalPages} = response.data;
            setUsers(users);
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

    const nextPageHandler = async () => {
        if (page < totalPages) {
            setPage((prevState) => prevState + 1);
        }
    };

    const prevPageHandler = async () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1);
        }
    };

    const userViewHandler = async (id: string) => {
        try {
            const response = await userService.findUserById(id);
            const {user} = response.data;
            return user;
        } catch (error: any) {
            showError(error);
        }
    };

    const userUpdateHandler = async (id: string) => {
        try {
            const response = await userService.findUserById(id);
            const {user} = response.data;
            setUpdateUser(user);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshUsersHandler = async () => {
        if (!searchText) {
            await loadUsers();
        } else {
            await searchUsers();
        }
    };

    const userDeleteHandler = async (user: User, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (user._id === updateUser?._id) {
                showError({message: "Can not delete. This user is to update!"});
                setOpen(false);
                return;
            }

            await userService.deleteUser(user._id);
            showAlert("User deleted successfully!", "success");
            await refreshUsersHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadUsers();
        }
    }, [loadUsers]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchUsers();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchUsers]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {toggleUpdate && updateUser &&
                    <UserUpdateForm
                        key={updateUser._id}
                        user={updateUser}
                        setUpdateUser={setUpdateUser}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshUsers={refreshUsersHandler}
                    />
                }

                <ContextHeader
                    title={"Users"}
                    description={"All Users"}
                    elementRef={elementRef}
                    searchTextChangeHandler={searchTextChangeHandler}
                />
            </div>

            <div className="min-w-full shadow rounded-lg overflow-x-auto">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && users.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No users were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && users.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="pl-5 pr-2 py-3 font-semibold">Profile</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Username</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Role</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Created Date</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">View Option</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Update Option</th>
                                <th className="pl-5 pr-2 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {users.map((user) => {
                                const createdAt = new Date(user.createdAt).toISOString().split('T')[0];

                                return (
                                    <tr key={user._id} className="border-b border-gray-200">
                                        <td className="pl-5 pr-2 py-1">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-14 h-14">
                                                    <img className="w-full h-full border rounded-full"
                                                         src={user.profile?.avatar}
                                                         alt={user.profile?.fullName}/>
                                                </div>
                                                <div className="ml-3 w-full">
                                                    <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900 whitespace-nowrap">#{user.profile?._id}</p>
                                                    <p className="text-gray-900 whitespace-nowrap">{user.profile?.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-5 pr-2 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{user.username}</p>
                                        </td>
                                        <td className="pl-5 pr-2 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{user.role}</p>
                                        </td>
                                        <td className="pl-5 pr-2 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{createdAt}</p>
                                        </td>
                                        <td className="px-5 py-1">
                                            <ViewButton id={user._id} onView={userViewHandler} type={"User"} DetailsView={UserDetails}/>
                                        </td>
                                        <td className="px-5 py-1">
                                            <UpdateButton id={user._id} onUpdate={userUpdateHandler}/>
                                        </td>
                                        <td className="px-5 py-1">
                                            <DeleteButton type={"user"} record={user} onDelete={userDeleteHandler}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && users.length > 0 &&
                <PaginationBar
                    title={"users"}
                    style={'mt-2.5'}
                    page={page}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    from={from}
                    to={to}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            }
        </>
    );
}

export default UserList;