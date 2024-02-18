import React from "react";
import BookList from "../components/book/BookList.tsx";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";

const Book: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Books"}/>
            </div>
            <DashboardContext>
                <BookList/>
            </DashboardContext>
        </>

    );
}

export default Book;