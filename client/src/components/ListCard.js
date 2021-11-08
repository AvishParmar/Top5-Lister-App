import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(255, 244, 229)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [open, setOpen] = useState(false);

    let name = "";
    if (store.listMarkedForDeletion !== null) {
        name = store.listMarkedForDeletion.name;
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            console.log(store.listMarkedForDeletion);
            if (store.listMarkedForDeletion === null) {
                // CHANGE THE CURRENT LIST
                store.setCurrentList(id);
            }
            else if (id !== store.listMarkedForDeletion._id) {
                // CHANGE THE CURRENT LIST
                store.setCurrentList(id);
            }
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
        handleOpen();
    }

    function handleConfirm() {
        store.deleteMarkedList();
        handleClose();
    }

    function handleCancel() {
        store.unmarkListForDeletion();
        console.log(store.listMarkedForDeletion);
        handleClose();
    }


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement =

        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Alert severity="warning" sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Warning: This action will be permanent
                    </Typography>
                    <Typography severity="warning">Are you sure you want to delete Top 5 {name}?</Typography>
                    <Button onClick={handleConfirm}>Confirm</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Alert>
            </Modal>
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{ fontSize: '48pt' }} />
                </IconButton>
            </Box>
        </ListItem>
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;