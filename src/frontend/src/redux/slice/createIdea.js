import { createSlice } from "@reduxjs/toolkit";
import { CreateIdeaThunk } from "../action/createIdea";

const initialState = {
    loadss: false,
    createIdea: null,
    error: null,
}

const CreateIdeaSlice= createSlice({
    name: "createIdea",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateIdeaThunk.pending] : (state) =>{
        return{
            ...state,
            loadss: true
        }
      },
      [CreateIdeaThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadss:false,
            error:payload
        }
      },
      [CreateIdeaThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadss: false,
            createIdea: payload
        }
      }  
    }
})

export default CreateIdeaSlice.reducer