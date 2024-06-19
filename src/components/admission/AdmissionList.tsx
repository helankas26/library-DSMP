import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

import ViewButton from "../shared/ViewButton.tsx";
import UpdateButton from "../shared/UpdateButton.tsx";
import DeleteButton from "../shared/DeleteButton.tsx";
import UpdateAdmissionForm from "./UpdateAdmissionForm.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Admission from "../../model/Admission.ts";
import admissionService from "../../services/api/admission.ts";
import ContextHeader from "../shared/ContextHeader.tsx";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";
import PaginationBar from "../shared/PaginationBar.tsx";

const AdmissionDetails = React.lazy(() => import('./AdmissionDetails.tsx'));

const AdmissionList: React.FC = () => {
    const size: number = 24;
    const {showError, showAlert} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(750);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateAdmission, setUpdateAdmission] = useState<Admission>();

    const loadAdmissions = useCallback(async () => {
        try {
            const response = await admissionService.findAllAdmissionsWithPagination(page, size);

            const {admissions, from, to, totalCount, totalPages} = response.data;
            setAdmissions(admissions);
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


    const searchAdmissions = useCallback(async () => {
        try {
            const response = await admissionService.findAllAdmissionsBySearchWithPagination(searchText, page, size);

            const {admissions, from, to, totalCount, totalPages} = response.data;
            setAdmissions(admissions);
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

    const admissionViewHandler = async (id: string) => {
        try {
            const response = await admissionService.findAdmissionById(id);
            const {admission} = response.data;
            return admission;
        } catch (error: any) {
            showError(error);
        }
    };

    const admissionUpdateHandler = async (id: string) => {
        try {
            const response = await admissionService.findAdmissionById(id);
            const {admission} = response.data;
            setUpdateAdmission(admission);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshAdmissionsHandler = async () => {
        if (!searchText) {
            await loadAdmissions();
        } else {
            await searchAdmissions();
        }
    };

    const admissionDeleteHandler = async (admission: Admission, setOpen: Dispatch<SetStateAction<boolean>>) => {
        try {
            if (admission._id === updateAdmission?._id) {
                showError({message: "Can not delete. This admission is to update!"});
                setOpen(false);
                return;
            }

            await admissionService.deleteAdmission(admission._id);
            showAlert("Admission deleted successfully!", "success");
            await refreshAdmissionsHandler();
            setOpen(false);
        } catch (error: any) {
            showError(error);
        }
    };

    useEffect(() => {
        if (!searchText) {
            loadAdmissions();
        }
    }, [loadAdmissions]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchText) {
                searchAdmissions();
            }
        }, delay);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchAdmissions]);

    return (
        <>
            <div className="flex flex-col gap-8">
                {toggleUpdate && updateAdmission &&
                    <UpdateAdmissionForm
                        key={updateAdmission._id}
                        admission={updateAdmission}
                        setUpdateAdmission={setUpdateAdmission}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshAdmissions={refreshAdmissionsHandler}
                    />
                }

                <ContextHeader
                    title={"Admissions"}
                    description={"All Admissions"}
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

                {!isLoading && admissions.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No admissions were found matching your selection.
                        </p>
                    </div>
                }

                {!isLoading && admissions.length > 0 &&
                    <table className="min-w-full leading-normal">
                        <thead className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Member</th>
                                <th className="px-5 py-3 font-semibold">Fee</th>
                                <th className="px-5 py-3 font-semibold">Librarian</th>
                                <th className="px-5 py-3 font-semibold">Paid Date</th>
                                <th className="px-5 py-3 font-semibold">View Option</th>
                                <th className="px-5 py-3 font-semibold">Update Option</th>
                                <th className="px-5 py-3 font-semibold">Delete Option</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white text-sm">
                            {admissions.map((admission) => {
                                const paidAt = new Date(admission.createdAt).toISOString().split('T')[0];

                                return (
                                    <tr key={admission._id} className="border-b border-gray-200">
                                        <td className="px-5 py-1">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-14 h-14">
                                                    <img className="w-full h-full border rounded-full"
                                                         src={admission.member.avatar}
                                                         alt={admission.member.fullName}/>
                                                </div>
                                                <div className="ml-3 w-full">
                                                    <p className="bg-gray-200 px-1.5 text-center rounded text-gray-900 whitespace-nowrap">#{admission.member._id}</p>
                                                    <p className="text-gray-900 whitespace-nowrap">{admission.member.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{admission.fee}</p>
                                        </td>
                                        <td className="px-5 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{admission.librarian.fullName}</p>
                                        </td>
                                        <td className="px-5 py-1">
                                            <p className="text-gray-900 whitespace-nowrap">{paidAt}</p>
                                        </td>
                                        <td className="px-5 py-1">
                                            <ViewButton id={admission._id} onView={admissionViewHandler} type={"Admission"} DetailsView={AdmissionDetails}/>
                                        </td>
                                        <td className="px-5 py-1">
                                            <UpdateButton id={admission._id} onUpdate={admissionUpdateHandler}/>
                                        </td>
                                        <td className="px-5 py-1">
                                            <DeleteButton type={"admission"} record={admission} onDelete={admissionDeleteHandler}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>

            {!isLoading && admissions.length > 0 &&
                <PaginationBar
                    title={"admissions"}
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

export default AdmissionList;