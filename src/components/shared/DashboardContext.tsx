import React, {ReactNode} from "react";

const DashboardContext: React.FC<{ children: ReactNode }> = (props) => {
    const {children} = props;

    return (
        <div className="bg-white p-8 w-full h-full overflow-hidden overflow-y-auto no-scrollbar">
            {children}
        </div>
    );
}

export default DashboardContext;