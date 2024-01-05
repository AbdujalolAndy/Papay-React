import { Avatar, Box, Button, Stack } from "@mui/material"

//Redux imports
import { Dispatch } from "@reduxjs/toolkit"
import { setMemberFollowers } from "./slice"
import { Follower } from "../../types/follow"
import { createSelector } from "reselect"
import { retrieveMemberFollowers } from "./selector"
import { useDispatch, useSelector } from "react-redux"

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

const followers = [
    { mb_nick: "botir", following: true, user_img: "/auth/default_user.svg" },
    { mb_nick: "andy", following: false, user_img: "/community/avatar_ex_2.jpg" },
    { mb_nick: "jonibek", following: true, user_img: "/community/avatar_ex_4.jpg" },
]

export function MemberFollowers(props: any) {
    //Initializations
    const { action_enabled } = props
    const { setMemberFollowers } = actionDispatch(useDispatch())
    const { memberFollowers } = useSelector(memberFollowersRetriever)
    //Handlers
    return (
        <Stack>
            {followers.map((follower) => {
                // const image_url = "/auth/default_user.svg"
                return (
                    <Box className="follow_box">
                        <Avatar alt={""} src={follower.user_img} sx={{ width: 89, height: 89 }} />
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
                            <span className="name_text">{follower.mb_nick}</span>
                        </div>
                        {action_enabled && (follower.following ? (
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
                            >
                                FOLLOW BACK
                            </Button>
                        ))}
                    </Box>
                )
            })}
        </Stack>

    )
}