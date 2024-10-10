import React, {useState} from "react";
import  {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
   } from '@mui/material';
import CustomizedAccordions from "../component/Accordion";
import { useNavigate } from "react-router";
import ApiCall from "../context/ApiCall";
import { createIdea } from "../utils/endpoints";
const Dashboard=()=>{
    const [open, setOpen] = useState(false);
    const  [inputIdea, setInputIdea] = useState()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
   // Navigation
  const navigate = useNavigate()
  const goToContribute=()=>{
    navigate('/contribute')
  }
  // create business idea 
  const { GenBusinessIdea } = ApiCall()
  const submit=async()=>{
    if(inputIdea){
        const aiIdea =await GenBusinessIdea(inputIdea);
        if(aiIdea){
          const data ={
            promptIdea: inputIdea,
            aiIdea
          }
          await createIdea(data)
        }
    }
  }

    return(
        <>
         <div className="Dashboard">
         <div className="Title">
            <p>Dashboard</p>
            <p onClick={goToContribute} style={{textDecoration:"underline", cursor:"pointer"}}>Contribute</p>
            <button className="AddBtn" onClick={handleClickOpen}>+ Add Idea</button>
         </div>
         <div style={{marginTop:"20px", marginBottom:"40px"}}></div>
         <div className="accordionContainer">
          <CustomizedAccordions/> 
        </div>
    </div>
    <Dialog
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle>Your Prompt</DialogTitle>
        <DialogContent>
        <form className="Form" onSubmit={submit}>
                 <textarea 
                 className="textArea"
                 placeholder="Describe your project, product or service idea"
                 value={inputIdea}
                 onChange={(e) => setInputIdea(e.target.value)}
                 />           
                 <button type="submit" className="buttonComment">
                     Submit
                 </button>
              </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </>
   
    )
}

export default Dashboard