import React from "react";
import ReactDOM from "react-dom";
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";

import SnackbarServiceProps from "../../model/SnackbarServiceProps.ts";

const SnackbarService: React.FC<{ options: SnackbarServiceProps }> = (props) => {
    const {options} = props;
    const [open, setOpen] = React.useState<boolean>(options.isOpen);

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        options.onClear();
        setOpen(false);
    };

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Snackbar
                    open={open}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    autoHideDuration={2500}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={options.severity}
                        sx={{width: '100%'}}>
                        {options.message}
                    </Alert>
                </Snackbar>,
                document.getElementById('snackbar-root') as HTMLElement
            )}
        </React.Fragment>
    );
}

export default SnackbarService;