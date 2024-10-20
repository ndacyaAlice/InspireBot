import React, {useState,useContext} from "react";
import  {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
   } from '@mui/material';
import CustomizedAccordions from "../component/Accordion";
import ApiCall from "../context/ApiCall";
import AuthContext from "../context/authContext";
import Profile from "../component/Profile";
import { useDispatch, useSelector } from "react-redux";
import { CreateIdeaThunk } from "../redux/action/createIdea";
import { MyBusinessThunk } from "../redux/action/MyBusiness";

const Dashboard=()=>{
    const [open, setOpen] = useState(false);
    const  [inputIdea, setInputIdea] = useState();
    const dispatch = useDispatch()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  //Context

  const {hasProfile} = useContext(AuthContext);
  if(!hasProfile){
    return <Profile/>
  }

  // create business idea 

  const { GenBusinessIdea } = ApiCall()
  const submit=async(e)=>{
    e.preventDefault()
    if(inputIdea){
        const aiIdea =await GenBusinessIdea(inputIdea);
        if(aiIdea){
          const data ={
            promptIdea: inputIdea,
            aiIdea
          }
          await dispatch(CreateIdeaThunk(data));
          setInputIdea(" ");
          dispatch(MyBusinessThunk())
        }
    }
  }
   const { loadss,createIdea,error, } = useSelector((state)=>state.createIdea)
    return(
        <>
         <div className="Dashboard">
         <div className="Title">
            <p>Dashboard</p>
            <a href="/contribute" style={{textDecoration:"underline", cursor:"pointer"}}>Contribute</a>
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
        PaperProps={{
          sx: { width: '600px', maxWidth: 'unset' },
        }}
     
      >
        <DialogTitle>Your Prompt</DialogTitle>
        <DialogContent >
        <form className="Form" onSubmit={submit}>
                 <textarea 
                 className="textArea"
                 placeholder="Describe your project, product or service idea"
                 value={inputIdea}
                 name="idea"
                 onChange={(e) => setInputIdea(e.target.value)}
                 />           
                 <button type="submit" className="buttonComment">
                     {loadss? <CircularProgress size={20} color="primary" />:"Submit"}
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