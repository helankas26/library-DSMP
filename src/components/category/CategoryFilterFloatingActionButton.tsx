import React, {Suspense, useState} from "react";
import Fab from '@mui/material/Fab';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';

import CategoryFilterDrawer from "./CategoryFilterDrawer.tsx";

const CategoryFilterFloatingActionButton: React.FC<{
    onChangeSelectedCategory: (category: string) => void
}> = (props) => {
    const {onChangeSelectedCategory} = props;

    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Fab onClick={toggleDrawer(true)} color="primary" sx={{position: 'fixed', bottom: 24, right: 16}}>
                <WidgetsRoundedIcon/>
            </Fab>

            {open && (
                <Suspense>
                    <CategoryFilterDrawer
                        onChangeSelectedCategory={onChangeSelectedCategory}
                        open={open}
                        toggleDrawer={toggleDrawer}
                    />
                </Suspense>
            )}
        </>
    );
}

export default CategoryFilterFloatingActionButton;