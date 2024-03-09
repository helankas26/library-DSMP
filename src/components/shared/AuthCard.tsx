import React from "react";
import AuthCardProps from "../../model/AuthCardProps.ts";

const AuthCard: React.FC<AuthCardProps> = (props) => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex rounded-lg shadow-2xl drop-shadow-2xl">
                    <img src={props.imageUrl}
                         className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"/>
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthCard;