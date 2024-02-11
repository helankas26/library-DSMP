import React from "react";

const BookShowcaseItem: React.FC = () => {
    return (
        <div
            className="relative grid h-[24rem] w-full max-w-[18rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl drop-shadow-2xl">
            <div
                className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <img className="rounded-t-xl h-full w-full"
                     src="https://m.media-amazon.com/images/I/81wAshyxQyL._AC_UF1000,1000_QL80_.jpg"
                     alt=""/>
                <div
                    className="absolute inset-0 w-full h-full to-black/10 bg-gradient-to-t from-black/95 via-black/35"></div>
            </div>
            <div className="relative py-6 px-3">
                <h2 className="block font-sans text-4xl font-medium tracking-normal text-white antialiased bg-gray-700 bg-opacity-75 rounded-xl px-2">
                    Head First Java
                </h2>
            </div>
        </div>
    );
}

export default BookShowcaseItem;