import { createSlice } from "@reduxjs/toolkit";
import { GetProfileThunk } from "../action/getProfile";

const initialState = {
    load: false,
    OneProfile: null,
    error: null,
}

const OneProfileSlice= createSlice({
    name: "OneProfile",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetProfileThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [GetProfileThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [GetProfileThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            load: false,
            OneProfile: payload
        }
      }  
    }
})

export default OneProfileSlice.reducer