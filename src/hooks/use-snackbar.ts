import {useEffect, useState} from "react";
import SnackbarServiceProps from "../model/SnackbarServiceProps.ts";
import {AlertColor} from "@mui/material/Alert/Alert";

let listener: any;

const useSnackbar = (shouldListen = false) => {
    const [snackbarState, setSnackbarState] = useState<SnackbarServiceProps>();

    const showError = (err: any) => {
        let message: string;

        if (err.response) {
            message = err.response.data.message;
        } else if (err.request) {
            message = err.request.message;
        } else {
            message = err.message;
        }

        listener({
            message: message,
            isOpen: true,
            severity: 'error',
            onClear: () => {
                listener(undefined);
            }
        });
    };

    const showAlert = (message: string, severity: AlertColor) => {
        listener({
            message: message,
            isOpen: true,
            severity: severity,
            onClear: () => {
                listener(undefined);
            }
        });
    };

    useEffect(() => {
        if (shouldListen) {
            listener = setSnackbarState;
        }

        return () => {
            if (shouldListen) {
                listener = undefined;
            }
        };

    }, [shouldListen]);


    return {snackbarState, showError, showAlert};
}

export default useSnackbar;