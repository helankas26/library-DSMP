import {Dispatch, SetStateAction} from "react";

interface HomeStateContext {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    selectedCategoryId: string | undefined;
    setSelectedCategoryId: Dispatch<SetStateAction<string | undefined>>;
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    searching: string;
    setSearching: Dispatch<SetStateAction<string>>;
}


export default HomeStateContext;