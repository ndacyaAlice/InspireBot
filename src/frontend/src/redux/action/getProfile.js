import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";


export const GetProfileThunk = createAsyncThunk("getProfile",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getProfile();
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Err && ToastError(repo.Err.Err)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);