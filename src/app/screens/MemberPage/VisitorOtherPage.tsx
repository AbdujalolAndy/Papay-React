import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import { Facebook, Instagram, Telegram, YouTube } from "@mui/icons-material";

// Ohers
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";

export function VisitorOtherPage() {

    // Initialize
    const [value, setValue] = React.useState("1");

    // Handle Change
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue)
    }
    return (
        <div className="my_page">
            <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
                <Stack className="my_page_frame">
                    <TabContext value={value}>
                        <Stack className="my_page_left">
                            <Box display="flex" flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className="menu_name">Maqolalar</Box>
                                    <Box className="menu_content">
                                        <MemberPosts />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"2"}>
                                    <Box className="menu_name">Followers</Box>
                                    <Box className="menu_content">
                                        <MemberFollowers action_enabled={false}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"3"}>
                                    <Box className="menu_name">Following</Box>
                                    <Box className="menu_content">
                                        <MemberFollowing action_enabled={false}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"4"}>
                                    <Box className="menu_name">Tanlangan Maqola</Box>
                                    <Box className="menu_content"></Box>
                                </TabPanel>

                            </Box>
                        </Stack>

                        <Stack className="my_page_right">
                            <Box className="order_info_box">
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <div className="order_user_img">
                                        <img style={{ objectFit: "cover" }} src="/community/avatar_ex_2.jpg" className="order_user_avatar" />
                                        <div className="order_user_icon_box">
                                            <img src="/icons/user_icon.svg" />
                                        </div>
                                    </div>
                                    <span className="order_user_name">Leo</span>
                                    <span className="order_user_prof">USER</span>
                                </Box>
                                <Box className="user_media_box">
                                    <Facebook />
                                    <Instagram />
                                    <Telegram />
                                    <YouTube />
                                </Box>
                                <Box className="user_media_box">
                                    <p className="follows">Followers: 3</p>
                                    <p className="follows">Folliwings: 2</p>
                                </Box>
                                <p className="user_desc">"qo'shimcha malumot kiritilmagan"</p>
                                <Box
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    sx={{ mt: "1px" }}
                                >
                                    <TabList
                                        onChange={handleChange}
                                    >
                                        <Tab
                                            style={{ flexDirection: "column" }}
                                            value="4"
                                            component={() => (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    >
                                                    BEKOR QILISH
                                                </Button>
                                            )}
                                        />
                                    </TabList>
                                </Box>
                            </Box>

                            <Box className="my_page_menu">
                                <TabList
                                    onChange={handleChange}
                                    aria-label="tabs API tabs example"
                                >
                                    <Tab
                                        value={"1"}
                                        style={{ flexDirection: "column" }}
                                        component={() => (
                                            <div
                                                className={`menu_box ${value}`}
                                                onClick={() => setValue("1")}
                                            >
                                                <img src="/icons/post.svg" />
                                                <span>Maqolalari</span>
                                            </div>
                                        )}
                                    />
                                    <Tab
                                        style={{ flexDirection: "column" }}
                                        value={"2"}
                                        component={() => (
                                            <div
                                                className={`menu_box ${value}`}
                                                onClick={() => setValue("2")}
                                            >
                                                <img src="/icons/followers.svg" />
                                                <span>Followers</span>
                                            </div>
                                        )}
                                    />
                                    <Tab
                                        style={{ flexDirection: "column" }}
                                        value={"3"}
                                        component={() => (
                                            <div
                                                className={`menu_box ${value}`}
                                                onClick={() => setValue("3")}
                                            >
                                                <img src="/icons/following.svg" />
                                                <span>Following</span>
                                            </div>
                                        )}
                                    />
                                </TabList>
                            </Box>
                        </Stack>
                    </TabContext>
                </Stack>
            </Container>
        </div>
    );
}