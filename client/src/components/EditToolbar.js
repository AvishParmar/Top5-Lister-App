import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/


function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        console.log(store.canRedo());
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isItemNameEditActive) {
        editStatus = true;
    }  
    // if(store.canUndo()){
    //     setBtnDisabledUndo(false);
    // }
    // if(store.canRedo()){
    //     setBtnDisabledRedo(false);
    // }
    let disabledUndo = true;
    let disabledRedo = true;
    console.log("Store: "+ store.canUndo())
    if(store.canUndo() && !editStatus){
        disabledUndo = false;
    }
    if(store.canRedo() && !editStatus){
        disabledRedo = false;
    }
    console.log(disabledUndo);
    console.log(disabledRedo);
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={disabledUndo}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disabled={disabledRedo}
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
                >
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;