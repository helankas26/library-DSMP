import React, {ReactNode} from "react";

const DashboardContext: React.FC<{ children: ReactNode }> = (props) => {
    return (
        <div className="bg-white p-8 w-full">
            {props.children}
        </div>
    );
}

export default DashboardContext;