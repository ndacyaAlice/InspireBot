import { createSlice } from "@reduxjs/toolkit";
import { InviteThunk } from "../action/invite";

const initialState = {
    load: false,
    invite: null,
    error: null,
}

const InviteSlice= createSlice({
    name: "invite",
    initialState,
    reducers: {

    },

    extraReducers: {
      [InviteThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [InviteThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [InviteThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            load: false,
            invite: payload
        }
      }  
    }
})

export default InviteSlice.reducer