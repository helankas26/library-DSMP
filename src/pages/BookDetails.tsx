import React, {useEffect, useState} from "react";
import {LoaderFunctionArgs} from "@remix-run/router/utils.ts";
import {useLoaderData} from "react-router-dom";

import bookService from "../services/api/book.ts";
import reservationService from "../services/api/reservation.ts";
import HttpResponse from "../utils/http-response.ts";
import Book from "../model/Book.ts";
import Reservation from "../model/Reservation.ts";
import useSnackbar from "../hooks/use-snackbar.ts";
import useScrollToTop from "../hooks/use-scroll-to-top.ts";

const BookDetails: React.FC = () => {
    const {book} = useLoaderData() as HttpResponse<Book>;
    const {scrollToTop} = useScrollToTop();
    const {showError, showAlert} = useSnackbar();

    const [isReserving, setIsReserving] = useState<boolean>(false);

    const reservationHandler = async () => {
        setIsReserving(true);

        const reservation: Reservation = {
            book: book._id
        } as unknown as Reservation;

        try {
            await reservationService.createReservation(reservation);
            showAlert("Reserved successfully!", "success");
        } catch (error: any) {
            showError(error);
        } finally {
            setIsReserving(false);
        }
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <div className="p-6 max-w-2xl lg:max-w-6xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full lg:sticky top-28 sm:flex gap-2">
                    <img className="w-full rounded object-cover border"
                         src={book.cover}
                         alt={book.name}/>
                </div>
                <div>
                    <h2 className="text-4xl font-medium text-gray-800">{book.name}</h2>
                    <div className="mt-8">
                        <p className="text-gray-800 bg-white">{book.description}</p>
                    </div>
                    <div className="mt-8">
                        {book.availableCount > 0 &&
                            <span className="bg-green-500 text-gray-50 py-1 px-4 rounded-3xl">Available</span>
                        }

                        {book.availableCount === 0 &&
                            <span className="bg-red-500 text-gray-50 py-1 px-4 rounded-3xl">Not Available</span>
                        }
                    </div>
                    <div className="mt-8">
                        <button
                            className="w-full mt-2 py-3 px-4 font-medium text-white rounded shadow transition duration-150 bg-orange-500 hover:bg-orange-600 active:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-500"
                            type="button"
                            onClick={reservationHandler}
                            disabled={book.availableCount === 0 || isReserving}>
                            {!isReserving && 'Reserve Your Copy'}
                            {isReserving && 'Reserving . . .'}

                        </button>
                    </div>
                    <div className="mt-8 relative overflow-x-auto shadow-xl">
                        <table className="w-full text-sm text-left rtl:text-right border">
                            <tbody>
                                <tr className="border-b bg-white">
                                    <th className="px-6 py-3 text-xs text-gray-700 uppercase">Title</th>
                                    <td className="px-6 py-3">{book.title}</td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-6 py-3 text-xs text-gray-700 uppercase">Edition</th>
                                    <td className="px-6 py-3">{book.edition || 'N/A'}</td>
                                </tr>
                                <tr className="border-b bg-white">
                                    <th className="px-6 py-3 text-xs text-gray-700 uppercase">Category</th>
                                    <td className="px-6 py-3">{book.category?.categoryName}</td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-6 py-3 text-xs text-gray-700 uppercase bg-gray-50">Authors</th>
                                    <td className="px-6 py-3">
                                        {book.authors?.map((author) => (
                                            <p key={author._id} className="leading-normal">{author.name}</p>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;

export const loader = async ({params}: LoaderFunctionArgs) => {
    const {id} = params;

    try {
        const response = await bookService.findBookById(id!);
        return {book: response.data.book};
    } catch (error: any) {
        throw {...error};
    }
}