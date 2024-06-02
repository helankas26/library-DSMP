import React, {ReactNode, useEffect} from "react";
import {useLocation} from "react-router-dom";

import useScrollToTop from "../../hooks/use-scroll-to-top.ts";

const DashboardContext: React.FC<{ children: ReactNode }> = (props) => {
    const {pathname} = useLocation();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();
    const {children} = props;

    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return (
        <div className="bg-white p-8 w-full h-full overflow-hidden overflow-y-auto no-scrollbar">
            <div ref={elementRef} className="invisible"></div>
            {children}
        </div>
    );
}

export default DashboardContext;