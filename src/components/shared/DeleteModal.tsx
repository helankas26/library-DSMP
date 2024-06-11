import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/material/Divider';

const DeleteModal: React.FC<{
    type: string;
    open: boolean;
    onClose: () => void;
    onDelete: () => Promise<void>;
}> = (props) => {
    const {type, open, onClose, onDelete} = props;
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteHandler = async () => {
        setIsDeleting(true);
        await onDelete();
        setIsDeleting(false);
    };

    const closeHandler = (_event: object, reason: string) => {
        if (['backdropClick', 'escapeKeyDown'].includes(reason) && isDeleting) {
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
                    Do you want to delete the {type}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    style={({textTransform: 'none', visibility: `${isDeleting ? 'hidden' : 'visible'}`})}
                    variant={"contained"}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    style={({textTransform: 'none'})}
                    variant={"contained"}
                    color={"error"}
                    disabled={isDeleting}
                    onClick={deleteHandler}
                >
                    {!isDeleting && 'Delete'}
                    {isDeleting && 'Deleting...'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;