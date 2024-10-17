
import { createAsyncThunk } from "@reduxjs/toolkit";
import { whereIContribute } from "../../utils/endpoints";
import { ToastError } from "../../utils/toast";


export const WhereIContributeThunk = createAsyncThunk("whereIContribute",
async(data,{rejectWithValue})=>{
    try{
        
       const repo = await whereIContribute();
       
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