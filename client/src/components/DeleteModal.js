import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    console.log(store.listMarkedForDeletion);

    const [open, setOpen] = React.useState(false);
    if (store.listMarkedForDeletion !== null) {
        name = store.listMarkedForDeletion.name;
        setOpen(true);
    }

    

    const handleClose = () => {
        setOpen(false);
    };
    function handleDeleteList(event) {
        // store.deleteMarkedList();
        handleCloseModal();
    }
    function handleCloseModal(event) {
        // store.unmarkListForDeletion();
        handleClose();
    }
    return (
        <div id="delete-modal">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete Top 5 {name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteList}>Confirm</Button>
                    <Button onClick={handleCloseModal} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteModal;