import { AppRootState } from "../../types/screen";
import { createSelector } from "reselect"

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveChosenMember = createSelector(
    selectMemberPage,
    (MemberPage) => MemberPage.chosenMember
)

export const retrieveChosenMemberBoArticles = createSelector(
    selectMemberPage,
    (MemberPage) => MemberPage.chosenMemberBoArticles
)

export const retrieveChosenSingleBoArticle = createSelector(
    selectMemberPage,
    (MemberPage) => MemberPage.chosenSingleBoArticle
)

export const retrieveMemberFollowers = createSelector(
    selectMemberPage,
    (MemberPage) => MemberPage.memberFollowers
)

export const retrieveMemberFollowing = createSelector(
    selectMemberPage,
    (MemberPage) => MemberPage.memberFollowing
)