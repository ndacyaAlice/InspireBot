import { createSlice } from "@reduxjs/toolkit";
import { ContributeThunk } from "../action/contribute";

const initialState = {
    load: false,
    contribution: null,
    error: null,
}

const ContributionSlice= createSlice({
    name: "contribution",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ContributeThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [ContributeThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [ContributeThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            contribution: payload
        }
      }  
    }
})

export default ContributionSlice.reducer