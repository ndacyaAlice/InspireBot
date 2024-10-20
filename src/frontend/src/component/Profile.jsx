import React from "react";
import { CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CreateProfileThunk } from "../redux/action/createProfile";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValid } from "../validation/SystemValidate";

const Profile=()=>{
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors}}  = useForm({
    resolver: yupResolver(profileValid)
  })
   const submit=async(data)=>{
    dispatch(CreateProfileThunk(data));
   }
   const {  load,profile,error} = useSelector((state)=>state.createProfile);

   if(profile && !error){
    setTimeout(()=>{
      window.location.reload();
    },[2000])
    
   }
    return(
        <div className="Dashboard">
        <div className="Title">
           <div className="formContainer">
            <p>Profile</p>
           <form  onSubmit ={handleSubmit(submit)} className="Form1" noValidate>
           <div className="TextField">
            <TextField
              label="Full name"
              {...register("userName")}
              fullWidth
              name="userName"
              variant="standard"
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
          </div>
          <div className="TextField">
            <TextField
            {... register("userEmail")}
              label="email"
              fullWidth
              name="userEmail"
              variant="standard"
              error={!!errors.userEmail}
              helperText={errors.userEmail?.message}
            />
          </div>
          <button type="submit" className="SubmitBtn" >
              {load?<CircularProgress size={20} color="white" />: "Submit" }
            </button>
        
           </form>
           </div>
        </div>
        </div>
    )
}

export default Profile