import React, {Dispatch, SetStateAction} from "react";
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Form} from "react-router-dom";

const SearchBar: React.FC<{
    searching: string;
    setSearching: Dispatch<SetStateAction<string>>;
    onSearchBooks: () => void
}> = (props) => {
    const {searching, setSearching, onSearchBooks} = props;

    return (
        <>
            <Form
                className="w-full h-9 rounded-lg flex items-center justify-center"
                onSubmit={(event) => {
                    searching.trim() ? onSearchBooks() : event.preventDefault();
                }}>
                <input
                    className="w-full h-full outline-none pl-3 pr-2 rounded-l-lg text-black"
                    type="search"
                    value={searching}
                    onChange={(e) => {
                        setSearching(e.target.value);
                    }}
                    placeholder="Search books"/>

                <button
                    className="w-14 h-full rounded-r-lg bg-amber-600 flex items-center justify-center hover:bg-amber-700 active:bg-amber-600 hover:cursor-pointer"
                    type="submit">
                    <MagnifyingGlassIcon className="m-auto h-5 w-5 text-white" aria-hidden="true"/>
                </button>
            </Form>
        </>
    );
}

export default SearchBar;