import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import AuthorList from "../components/author/AuthorList.tsx";

const Author: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Authors"}/>
            </div>
            <DashboardContext>
                <AuthorList/>
            </DashboardContext>
        </>
    );
}

export default Author;