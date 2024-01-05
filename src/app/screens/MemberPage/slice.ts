import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../types/screen";

const initialState: MemberPageState = {
    chosenMember: null,
    chosenMemberBoArticles: [],
    chosenSingleBoArticle: null,
    memberFollowers: [],
    memberFollowing: [],
}

const memberPageSlice = createSlice({
    name: "MemberPage",
    initialState,
    reducers: {
        setChosenMember: (state, action) => {
            state.chosenMember = action.payload
        },
        setChosenMemberBoArticles: (state, action) => {
            state.chosenMemberBoArticles = action.payload
        },
        setChosenSingleBoArticle: (state, action) => {
            state.chosenSingleBoArticle = action.payload
        },
        setMemberFollowers: (state, action) => {
            state.memberFollowers = action.payload
        },
        setMemberFollowing: (state, action) => {
            state.memberFollowing = action.payload
        }
    }
}
)

export const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
    setMemberFollowers,
    setMemberFollowing
} = memberPageSlice.actions;

const memberPageReducer = memberPageSlice.reducer
export default memberPageReducer