import React from "react";
import Box from "@mui/material/Box";

import TabPanelProps from "../../model/TabPanelProps.ts";

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            hidden={value !== index}
            {...other}
        >
            {value === index &&
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            }
        </div>
    );
}

export default CustomTabPanel;