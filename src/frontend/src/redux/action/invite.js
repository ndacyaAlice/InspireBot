import { createAsyncThunk } from "@reduxjs/toolkit";
import { invite } from "../../utils/endpoints";
import { ToastError, ToastSuccess } from "../../utils/toast";


export const InviteThunk = createAsyncThunk("invite",
async(data,{rejectWithValue})=>{
    try{
        const {email,BusinessId} =data;
       const repo = await invite(email,BusinessId);
       if(repo.Ok){
        ToastSuccess(repo.Ok)
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.InvalidPayload && ToastError(repo.Err.InvalidPayload)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.Err && ToastError(repo.Err.Err)}
        {repo.Err.Empty && ToastError(repo.Err.Empty)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);