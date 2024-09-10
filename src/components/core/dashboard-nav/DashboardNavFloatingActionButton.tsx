import React, {Suspense, useState} from "react";
import Fab from '@mui/material/Fab';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import DashboardNavModal from "./DashboardNavModal.tsx";

const DashboardNavFloatingActionButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeHandler = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Fab onClick={() => setIsOpen(true)} color="primary" sx={{position: 'absolute', bottom: 24, right: 16}}>
                <WidgetsRoundedIcon/>
            </Fab>

            {isOpen && (
                <Suspense>
                    <DashboardNavModal open={isOpen} closeHandler={closeHandler}/>
                </Suspense>
            )}
        </>
    );
}

export default DashboardNavFloatingActionButton;