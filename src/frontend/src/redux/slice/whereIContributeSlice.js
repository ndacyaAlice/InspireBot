import { createSlice } from "@reduxjs/toolkit";
import {  WhereIContributeThunk } from "../action/whereIcontribute";

const initialState = {
    loading: false,
    myContribution: null,
    error: null,
}

const  WhereIContributeSlice= createSlice({
    name: "MyContribution",
    initialState,
    reducers: {

    },

    extraReducers: {
      [WhereIContributeThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [WhereIContributeThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading: false,
            error:payload
        }
      },
      [WhereIContributeThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            myContribution: payload
        }
      }  
    }
})

export default  WhereIContributeSlice.reducer