import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/material/Divider';

const CancelReservationModal: React.FC<{
    open: boolean;
    onClose: () => void;
    onCancel: () => Promise<void>;
}> = (props) => {
    const {open, onClose, onCancel} = props;
    const [isCancelling, setIsCancelling] = useState<boolean>(false);

    const cancelHandler = async () => {
        setIsCancelling(true);
        await onCancel();
        setIsCancelling(false);
    };

    const closeHandler = (_event: object, reason: string) => {
        if (['backdropClick', 'escapeKeyDown'].includes(reason) && isCancelling) {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={open}
            onClose={closeHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className="flex items-center gap-2" id="alert-dialog-title">
                <WarningRoundedIcon color={"warning"}/>
                <p className="font-bold text-gray-700">Confirmation</p>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to cancel the reservation?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    style={({textTransform: 'none', visibility: `${isCancelling ? 'hidden' : 'visible'}`})}
                    variant={"contained"}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    style={({textTransform: 'none'})}
                    variant={"contained"}
                    color={"error"}
                    disabled={isCancelling}
                    onClick={cancelHandler}
                >
                    {!isCancelling && 'Confirm'}
                    {isCancelling && 'Cancelling...'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CancelReservationModal;