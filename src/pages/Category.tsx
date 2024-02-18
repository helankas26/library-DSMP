import React from "react";
import TitleBar from "../components/shared/TitleBar.tsx";
import DashboardContext from "../components/shared/DashboardContext.tsx";
import CategoryList from "../components/category/CategoryList.tsx";

const Category: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <TitleBar title={"Categories"}/>
            </div>
            <DashboardContext>
                <CategoryList/>
            </DashboardContext>
        </>
    );
}

export default Category;