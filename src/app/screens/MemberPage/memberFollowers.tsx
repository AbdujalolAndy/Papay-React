import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material"

//Redux imports
import { Dispatch } from "@reduxjs/toolkit"
import { setMemberFollowers } from "./slice"
import { FollowSearchObj, Follower } from "../../types/follow"
import { createSelector } from "reselect"
import { retrieveMemberFollowers } from "./selector"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import assert from "assert"
import { Definer } from "../../../lib/Definer"
import FollowApiService from "../../apiServices/followApiService"
import { serverApi } from "../../../lib/config"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { useHistory } from "react-router"

//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data))
})
//Redux selector
const memberFollowersRetriever = createSelector(
    retrieveMemberFollowers,
    (memberFollowers) => ({ memberFollowers })
)

interface MemberFollowers {
    action_enabled: boolean
}


export function MemberFollowers(props: any) {
    //Initializations
    const history = useHistory();
    const { action_enabled, mb_id, followRebuild, setFollowRebuild } = props
    const { setMemberFollowers } = actionDispatch(useDispatch())
    const { memberFollowers } = useSelector(memberFollowersRetriever);
    const [followerSearchObj, setFollowerSearchObj] = useState<FollowSearchObj>({ page: 1, limit: 4, mb_id: mb_id })

    //Hook
    useEffect(() => {
        assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
        const followService = new FollowApiService();
        followService.getMemberFollowers(followerSearchObj)
            .then(data => setMemberFollowers(data))
            .catch(err => console.log(err.message))
    }, [followerSearchObj, followRebuild])
    //Handlers
    const subscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation()
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            const followService = new FollowApiService();
            await followService.subscribe(id)
            sweetTopSmallSuccessAlert("subscribed successfully", 700, false)
            setFollowRebuild(new Date())
        } catch (err: any) {
            console.log(`ERROR::: subscribeHandler ${err.message}`);
            sweetErrorHandling(err)
        }
    }
    const handleChangePagination = (e: any, newValue: number) => {
        followerSearchObj.page = newValue;
        setFollowerSearchObj({ ...followerSearchObj })
    }
    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    };
    return (
        <Stack>
            {memberFollowers.map((follower: Follower) => {
                const image_url = follower.subscriber_member_data.mb_image ?
                    `${serverApi}/${follower.subscriber_member_data.mb_image}`
                    : "/auth/default_user.svg"
                return (
                    <Box className="follow_box">
                        <Avatar
                            alt={""}
                            src={image_url}
                            sx={{ width: 89, height: 89 }}
                            onClick={() => visitMemberHandler(follower?.subscriber_id)}
                        />
                        <div
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85%"
                            }}
                        >
                            <span className="username_text">{follower.subscriber_member_data?.mb_type}</span>
                            <span className="name_text">{follower.subscriber_member_data?.mb_nick}</span>
                        </div>
                        {action_enabled &&
                            (follower.me_followed && follower.me_followed[0]?.my_following ?
                                (
                                    <Button
                                        variant="contained"
                                        className="following_already"
                                        disabled>
                                        FOLLOWING
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <img
                                                src="/icons/follow_icon.svg"
                                                style={{ width: "40px" }}
                                            />
                                        }
                                        className="follow_btn"
                                        onClick={(e) => subscribeHandler(e, follower.subscriber_id)}
                                    >
                                        FOLLOW BACK
                                    </Button>
                                ))}
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
                        count={followerSearchObj.page >= 3 ? followerSearchObj.page + 1 : 3}
                        page={followerSearchObj.page}
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