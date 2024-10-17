import React, {useState} from "react";
import  {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle ,
    Box,
    Fab, 
    CircularProgress
   } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { InviteThunk } from "../redux/action/invite";
import { useDispatch, useSelector } from "react-redux";

const Add=({BusinessId})=>{
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const {  load, invite, error } = useSelector((state)=>state.invite)
    return (
       <>
         <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="grey" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
       </Box>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
           dispatch(InviteThunk({email,BusinessId}))
          //  handleClose();
          },
        }}
      >
        <DialogTitle>Invite Contributor</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Invite Contributor on this business idea 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          { load?<CircularProgress size={20} color="primary" />:<Button type="submit">Invite</Button>}
        </DialogActions>
      </Dialog></>
    )
}

export default Add