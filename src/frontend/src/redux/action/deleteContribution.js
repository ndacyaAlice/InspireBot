import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContribution } from "../../utils/endpoints";
import { ToastSuccess, ToastError } from "../../utils/toast";

export const DeleteContributionThunk = createAsyncThunk("deleteContribution",
async(data,{rejectWithValue})=>{
    try{
        const {businessId,contributeId} = data;
       const repo = await deleteContribution(businessId,contributeId);
       if(repo.Ok){
        ToastSuccess(repo.Ok)
        setTimeout(()=>{
            window.location.reload();
          },[2000])
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.InvalidPayload && ToastError(repo.Err.InvalidPayload)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.Err && ToastError(repo.Err.Err)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);