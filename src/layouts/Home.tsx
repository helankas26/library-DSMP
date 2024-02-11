import React from "react";
import MainHeader from "../components/core/MainHeader.tsx";
import MainFooter from "../components/core/MainFooter.tsx";
import {Outlet} from "react-router-dom";

const HomeLayout: React.FC = () => {
    return (
        <div className="flex flex-col bg-[url('assets/home-texture.png')]">
            <MainHeader/>
            <Outlet/>
            <MainFooter/>
        </div>
    );
}

export default HomeLayout;