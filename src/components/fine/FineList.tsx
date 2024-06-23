import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import UpdateFineForm from "./UpdateFineForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Fine from "../../model/Fine.ts";
import fineService from "../../services/api/fine.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const FineDetails = React.lazy(() => import('./FineDetails.tsx'));

const FineList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [fines, setFines] = useState<Fine[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateFine, setUpdateFine] = useState<Fine>();

    const loadFines = useCallback(async () => {
        try {
            const response = await fineService.findAllFinesWithPagination(page, size);

            const {fines, from, to, totalCount, totalPages} = response.data;
            setFines(fines);
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


    const searchFines = useCallback(async () => {
        try {
            const response = await fineService.findAllFinesBySearchWithPagination(searchText, page, size);

            const {fines, from, to, totalCount, totalPages} = response.data;
            setFines(fines);
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

    const fineViewHandler = async (id: string) => {
        try {
            const response = await fineService.findFineById(id);
            const {fine} = response.data;
            return fine;
        } catch (error: any) {
            showError(error);
        }
    };

    const fineUpdateHandler = async (id: string) => {
        try {
            const response = await fineService.findFineById(id);
            const {fine} = response.data;
            setUpdateFine(fine);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshFinesHandler = async () => {
        if (!searchText) {
            await loadFines();
        } else {
            await searchFines();
        }
    };

    const fineDeleteHandler = async (fine: Fine, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (fine._id === updateFine?._id) {
                showError({message: "Can not delete. This fine is to update!"});
                setOpen(false);
                return;
            }

            await fineService.deleteFine(fine._id);
            showAlert("Fine deleted successfully!", "success");
            await refreshFinesHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadFines();
        }
    }, [loadFines]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchFines();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchFines]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {toggleUpdate && updateFine &&
                    <UpdateFineForm
                        key={updateFine._id}
                        fine={updateFine}
                        setUpdateFine={setUpdateFine}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshFines={refreshFinesHandler}
                    />
                }

                <ContextHeader
                    title={"Fines"}
                    description={"All Fines"}
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

                {!isLoading && fines.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No fines were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && fines.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Member</th>
                                <th className="px-5 py-3 font-semibold">Fee</th>
                                <th className="px-5 py-3 font-semibold">Book</th>
                                <th className="px-5 py-3 font-semibold">No of Dates</th>
                                <th className="px-5 py-3 font-semibold">Paid Date</th>
                                <th className="px-5 py-3 font-semibold">Librarian</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                <th className="px-5 py-3 font-semibold">Update Option</th>
                                <th className="px-5 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {fines.map((fine) => {
                                const paidAt = new Date(fine.createdAt).toISOString().split('T')[0];

                                return (
                                    <tr key={fine._id} className="border-b border-gray-200">
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{fine.member?.fullName}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{fine.fee.toFixed(2)}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{`${fine.book?.title} ${fine.book?.edition}`}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{fine.noOfDate}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{paidAt}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <p className="text-gray-900 whitespace-nowrap">{fine.librarian?.fullName}</p>
                                        </td>
                                        <td className="px-5 py-2">
                                            <ViewButton id={fine._id} onView={fineViewHandler} type={"Fine"} DetailsView={FineDetails}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            <UpdateButton id={fine._id} onUpdate={fineUpdateHandler}/>
                                        </td>
                                        <td className="px-5 py-2">
                                            <DeleteButton type={"fine"} record={fine} onDelete={fineDeleteHandler}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && fines.length > 0 &&
                <PaginationBar
                    title={"fines"}
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

export default FineList;