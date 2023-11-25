import { Avatar, Box, Button, Stack } from "@mui/material"

interface MemberFollowers {
    action_enabled: boolean
}

const followers = [
    { mb_nick: "botir", following: true, user_img: "/auth/default_user.svg" },
    { mb_nick: "andy", following: false, user_img: "/community/avatar_ex_2.jpg" },
    { mb_nick: "jonibek", following: true, user_img: "/community/avatar_ex_1.jpg" },
]

export function MemberFollowers(props: any) {
    const { action_enabled } = props
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