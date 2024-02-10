import React from "react";

const AuthCard: React.FC = (props) => {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl drop-shadow-2xl z-10">
                {props.children}
            </div>
        </div>
    );
}

export default AuthCard;