import React from "react";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'

const SearchBar: React.FC = () => {
    return (
        <>
            <div className="w-full h-9 rounded-lg flex items-center justify-center">
                <input className="w-full h-full outline-none px-2.5 rounded-bl-2xl rounded-tl-2xl text-black"
                       placeholder="Search books" type="search"/>

                <button type="button"
                    className="w-14 h-full rounded-br-2xl rounded-tr-2xl bg-amber-600 flex items-center justify-center hover:bg-amber-700 hover:cursor-pointer">
                    <MagnifyingGlassIcon
                        className="m-auto h-5 w-5 text-white"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </>
    );
}

export default SearchBar;