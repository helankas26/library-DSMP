import React, {ReactNode} from "react";

const DashboardContext: React.FC<{ children: ReactNode }> = (props) => {
    return (
        <div className="bg-white p-8 w-full h-full overflow-hidden overflow-y-auto no-scrollbar">
            {props.children}
        </div>
    );
}

export default DashboardContext;