import { createSlice } from "@reduxjs/toolkit";
import { DeleteContributionThunk } from "../action/deleteContribution";

const initialState = {
    loader: false,
    deleteContribution: null,
    errors: null,
}

const DeleteContributionSlice= createSlice({
    name: "deleteContribution",
    initialState,
    reducers: {

    },

    extraReducers: {
      [DeleteContributionThunk.pending] : (state) =>{
        return{
            ...state,
            loader: true
        }
      },
      [DeleteContributionThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loader:false,
            errors:payload
        }
      },
      [DeleteContributionThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loader: false,
            deleteContribution: payload
        }
      }  
    }
})

export default DeleteContributionSlice.reducer