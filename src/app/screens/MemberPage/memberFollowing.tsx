import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material"


//Redux imports
import { Dispatch } from "@reduxjs/toolkit"
import { setMemberFollowing } from "./slice"
import { FollowSearchObj, Following } from "../../types/follow"
import { createSelector } from "reselect"
import { retrieveMemberFollowing } from "./selector"
import { useDispatch, useSelector } from "react-redux"
import FollowApiService from "../../apiServices/followApiService"
import { useEffect, useState } from "react"
import { serverApi } from "../../../lib/config";
import assert from "assert"
import { Definer } from "../../../lib/Definer"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { useHistory } from "react-router"
import { verifiedMemberData } from "../../apiServices/verify"

//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowing: (data: Following[]) => dispatch(setMemberFollowing(data))
})
//Redux selector
const memberFollowingRetriever = createSelector(
    retrieveMemberFollowing,
    (memberFollowing) => ({ memberFollowing })
)
interface MemberFollowing {
    action_enabled: boolean
}

export function MemberFollowing(props: any) {
    //Initializations
    const history = useHistory();
    const { action_enabled, mb_id, followRebuild, setFollowRebuild } = props,
        { setMemberFollowing } = actionDispatch(useDispatch()),
        { memberFollowing } = useSelector(memberFollowingRetriever),
        [followingSearchObj, setFollowingSearchObj] = useState<FollowSearchObj>({
            page: 1,
            limit: 4,
            mb_id: mb_id
        })

    //Hook
    useEffect(() => {
        const followService = new FollowApiService();
        followService.getMemberFollowings(followingSearchObj)
            .then(data => setMemberFollowing(data))
            .catch(err => console.log(err.message))
    }, [followingSearchObj, followRebuild])
    //Handlers
    const unsubscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation()
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const followService = new FollowApiService();
            await followService.unsubscribe(id);
            sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
            setFollowRebuild(new Date())
        } catch (err: any) {
            sweetErrorHandling(err)
        }
    }
    const handleChangePagination = (e: any, newValue: number) => {
        followingSearchObj.page = newValue;
        setFollowingSearchObj({ ...followingSearchObj })
    }
    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    };
    return (
        <Stack>
            {memberFollowing.map((following: Following) => {
                const image_url = following.follow_member_data.mb_image ?
                    `${serverApi}/${following.follow_member_data.mb_image}` :
                    "/auth/default_user.svg"
                return (
                    <Box className="follow_box">
                        <Avatar
                            alt={""}
                            src={image_url}
                            sx={{ width: 89, height: 89 }}
                            onClick={() => visitMemberHandler(following?.follow_id)} />
                        <div
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85%"
                            }}
                        >
                            <span className="username_text">USER</span>
                            <span className="name_text">{following.follow_member_data.mb_nick}</span>
                        </div>
                        {action_enabled && (
                            <Button
                                variant="contained"
                                startIcon={
                                    <img
                                        src="/icons/follow_icon.svg"
                                        style={{ width: "40px", marginLeft: "16px" }}
                                    />
                                }
                                className="follow_cancel_btn"
                                onClick={(e) => unsubscribeHandler(e, following.follow_id)}
                            >
                                Bekor Qilish
                            </Button>
                        )}
                    </Box>
                )
            })}
            <Stack
                sx={{ my: "40px" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box className="bottom_box">
                    <Pagination
                        count={followingSearchObj.page >= 3 ? followingSearchObj.page + 1 : 3}
                        page={followingSearchObj.page}
                        onChange={handleChangePagination}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: ArrowBack,
                                    next: ArrowForward
                                }}
                                {...item}
                                color={"secondary"}
                            />
                        )}
                    />
                </Box>
            </Stack>
        </Stack>
    )
}