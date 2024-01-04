import { AppRootState } from "../../types/screen";
import { createSelector } from "reselect"


const selectCommunityPage = (state: AppRootState) => state.communityPage;


export const targetBoArticlesRetrieve = createSelector(
    selectCommunityPage,
    (CommunityPage) => CommunityPage.targetBoArticles
)

