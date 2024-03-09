import {AlertColor} from "@mui/material/Alert/Alert";

interface SnackbarServiceProps {
    message: string;
    isOpen: boolean;
    severity: AlertColor,
    onClear: () => void
}

export default SnackbarServiceProps;