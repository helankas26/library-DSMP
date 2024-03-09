import React from "react";
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import SnackbarServiceProps from "../../model/SnackbarServiceProps.ts";

const SnackbarService: React.FC<{ options: SnackbarServiceProps }> = (props) => {
    const [open, setOpen] = React.useState<boolean>(props.options.isOpen);

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        props.options.onClear();
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={props.options.severity}
                    sx={{width: '100%'}}>
                    {props.options.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarService;