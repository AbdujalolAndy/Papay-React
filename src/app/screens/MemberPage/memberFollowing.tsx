import { Avatar, Box, Button, Stack } from "@mui/material"


//Redux imports
import { Dispatch } from "@reduxjs/toolkit"
import { setMemberFollowing } from "./slice"
import { Following } from "../../types/follow"
import { createSelector } from "reselect"
import { retrieveMemberFollowing } from "./selector"
import { useDispatch, useSelector } from "react-redux"

//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowing: (data: Following[]) => dispatch(setMemberFollowing(data))
})
//Redux selector
const memberFollowingRetriever = createSelector(
    retrieveMemberFollowing,
    (memberFollowing) => ({ memberFollowing })
)
const followings = [
    { mb_nick: "ulugbek", user_img: "/community/avatar_ex_2.jpg" },
    { mb_nick: "temur", user_img: "/auth/default_user.svg" },
    { mb_nick: "ravshan", user_img: "/community/avatar_ex_1.jpg" },
]
interface MemberFollowing {
    action_enabled: boolean
}

export function MemberFollowing(props: any) {
    //Initializations
    const { action_enabled } = props
    const { setMemberFollowing } = actionDispatch(useDispatch())
    const { memberFollowing } = useSelector(memberFollowingRetriever)
    //Handlers
    return (
        <Stack>
            {followings.map((following) => {
                // const image_url = "/auth/default_user.svg"
                return (
                    <Box className="follow_box">
                        <Avatar alt={""} src={following.user_img} sx={{ width: 89, height: 89 }} />
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
                            <span className="name_text">{following.mb_nick}</span>
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
                            >
                                Bekor Qilish
                            </Button>
                        )}
                    </Box>
                )
            })}
        </Stack>
    )
}