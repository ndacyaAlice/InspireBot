import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyBusiness } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";


export const MyBusinessThunk = createAsyncThunk("getMyBusiness",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await getMyBusiness();
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