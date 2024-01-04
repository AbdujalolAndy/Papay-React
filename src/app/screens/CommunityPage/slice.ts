import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../types/screen";


const initialState:CommunityPageState={
    targetBoArticles:[]
}

const communityPageSlice=createSlice({
    name:"communityPage",
    initialState,
    reducers:{
        setTargetBoArticles:(state, action)=>{
            state.targetBoArticles = action.payload
        }
    }
})

const {setTargetBoArticles}= communityPageSlice.actions;

const communityPageReducer = communityPageSlice.reducer
export default communityPageReducer