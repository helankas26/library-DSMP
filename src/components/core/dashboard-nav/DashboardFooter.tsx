import React from "react";

const DashboardFooter: React.FC<{ color?: string }> = (props) => {
    const {color} = props;
    const currentYear = new Date().getFullYear();

    return (
        <div className={`px-4 pb-1 space-y-8 overflow-hidden sm:px-6 lg:px-8 ${color ? color : 'bg-white'}`}>
            <p className="text-base leading-6 text-center text-[#334155]">
                Copyright &copy; {currentYear}
                &nbsp;
                <span
                    className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                        Library
                </span>
                &nbsp;
                by Helanka. All rights reserved.
            </p>
        </div>
    );
}

export default DashboardFooter;