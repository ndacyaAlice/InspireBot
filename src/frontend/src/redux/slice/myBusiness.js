import { createSlice } from "@reduxjs/toolkit";
import { MyBusinessThunk } from "../action/MyBusiness";

const initialState = {
    loading: false,
     myBusiness: null,
    error: null,
}

const MyBusinessSlice= createSlice({
    name: "MyBusiness",
    initialState,
    reducers: {

    },

    extraReducers: {
      [MyBusinessThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [MyBusinessThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading: false,
            error:payload
        }
      },
      [MyBusinessThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            myBusiness: payload
        }
      }  
    }
})

export default MyBusinessSlice.reducer