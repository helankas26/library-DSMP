import React from "react";

const MainBanner: React.FC = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="group relative flex h-64 w-11/12 overflow-hidden rounded-2xl">
                <div
                    className="w-full overflow-hidden rounded-2xl transition-all group-hover:mx-[1%]">
                    <div className="h-full w-full bg-cover bg-center bg-[url('assets/book-banner.jpg')]">
                        <div
                            className="flex h-full w-full items-center justify-center bg-[#455055]/80 transition-all group-hover:bg-[#31383b]/80">
                            <div
                                className="p-2.5 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300 transition-all group-hover:text-7xl">
                                Library
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainBanner;