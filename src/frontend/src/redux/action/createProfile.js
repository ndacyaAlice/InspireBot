import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProfile } from "../../utils/endpoints";
import { ToastSuccess , ToastError} from "../../utils/toast";


export const CreateProfileThunk = createAsyncThunk("createProfile",
async(data,{rejectWithValue})=>{
    try{
       
       const repo = await createProfile(data);
       if(repo.Ok){
        ToastSuccess(repo.Ok)
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