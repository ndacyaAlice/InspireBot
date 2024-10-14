import React from "react";
import { TextField } from "@mui/material";
import { createProfile } from "../utils/endpoints";

const Profile=()=>{
   const submit=async(e)=>{
    e.preventDefault();
    const data = {
      userName: e.target[0].value,
      userEmail: e.target[1].value
    }
   const profile= await createProfile(data);
   if(profile.Ok){
    await  window.location.reload();
   }
   }
    return(
        <div className="Dashboard">
        <div className="Title">
           <div className="formContainer">
            <p>Profile</p>
           <form  onSubmit ={submit} className="Form1" noValidate>
           <div className="TextField">
            <TextField
              label="Full name"
              fullWidth
              name="userName"
              variant="standard"
            />
          </div>
          <div className="TextField">
            <TextField
              label="email"
              fullWidth
              name="userEmail"
              variant="standard"
            />
          </div>
          <button type="submit" className="SubmitBtn" >
              Submit
            </button>
           </form>
           </div>
        </div>
        </div>
    )
}

export default Profile