import React, { useEffect, useState } from "react";
import { Box, Button, Container, Pagination, PaginationItem, Stack } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import { ArrowBack, ArrowForward, Facebook, Instagram, Telegram, YouTube } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

// Ohers
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/tuiEditor/tuiEditor";
import { TViewer } from "../../components/tuiEditor/tviewer";
import { Dispatch } from "@reduxjs/toolkit";

//Redux Imports
import { setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle } from "./slice";
import { Member } from "../../types/user";
import { BoArticle, SearchMemberArticleObj } from "../../types/boArticle";
import { createSelector } from "reselect"
import { retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify"
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";


//Redux Slice
const actionDsipatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setChosenMemberBoArticles: (data: BoArticle[]) => dispatch(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data: BoArticle) => dispatch(setChosenSingleBoArticle(data))
})

//Redux Selector
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({ chosenMember })
)
const chosenMemberBoArticlesRetriever = createSelector(
    retrieveChosenMemberBoArticles,
    (chosenMemberBoArticles) => ({ chosenMemberBoArticles })
)
const chosenSingleBoArticleRetriever = createSelector(
    retrieveChosenSingleBoArticle,
    (chosenSingleBoArticle) => ({ chosenSingleBoArticle })
)

export function VisitMyPage(props: any) {
    // Initializations
    const [value, setValue] = React.useState<string>("1"),
        {
            setChosenMember,
            setChosenMemberBoArticles,
            setChosenSingleBoArticle
        } = actionDsipatch(useDispatch()),

        { chosenMember } = useSelector(chosenMemberRetriever),
        { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever),
        { chosenMemberBoArticles } = useSelector(chosenMemberBoArticlesRetriever),
        [memberArticleObj, setMemberArticleObj] = useState<SearchMemberArticleObj>({ mb_id: 'none', page: 1, limit: 5 }),
        [rebuildArticle, setArticleRebuild] = useState<Date>(new Date),
        [followRebuild, setFollowRebuild] = useState<Date>(new Date()),
        [valuePage, setValuePage] = useState<number>(1)

    //Hook
    useEffect(() => {
        if (!localStorage.getItem("member_data")) {
            sweetFailureProvider("Please! Login first", true, true)
        };
        const communityService = new CommunityApiService();
        communityService.chosenMemberCommunityArticles(memberArticleObj)
            .then(data => setChosenMemberBoArticles(data))
            .catch(err => console.log(err.message))

        const memberService = new MemberApiService();
        memberService.chosenMember(verifiedMemberData._id)
            .then(data => setChosenMember(data))
            .catch(err => console.log(err.message))
    }, [memberArticleObj, rebuildArticle])

    // Handle Change
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue)
    }
    const handleChangePagination = (e: any, value: number) => {
        memberArticleObj.page = value;
        setMemberArticleObj({ ...memberArticleObj })
        setValuePage(value)
    }
    const chosenSingleBoArticleHandler = async (id: string) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            const communityService = new CommunityApiService();
            await communityService.chosenSingleBoArticle(id)
                .then(data => {
                    setChosenSingleBoArticle(data)
                    setValue("5")
                })
                .catch(err => console.log(err.message))

        } catch (err: any) {
            sweetErrorHandling(err)
        }
    }
    return (
        <div className="my_page">
            <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
                <Stack className="my_page_frame">
                    <TabContext value={value}>
                        <Stack className="my_page_left">
                            <Box display="flex" flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className="menu_name">Mening Maqolalarim</Box>
                                    <Box className="menu_content">
                                        <MemberPosts
                                            chosenMemberBoArticles={chosenMemberBoArticles}
                                            setArticleRebuild={setArticleRebuild}
                                            chosenSingleBoArticleHandler={chosenSingleBoArticleHandler}
                                        />
                                        <Stack
                                            sx={{ my: "40px" }}
                                            direction={"row"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <Box className="bottom_box">
                                                <Pagination
                                                    count={memberArticleObj.page >= 3 ? memberArticleObj.page + 1 : 3}
                                                    page={valuePage}
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
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"2"}>
                                    <Box className="menu_name">Followers</Box>
                                    <Box className="menu_content">
                                        <MemberFollowers
                                            action_enabled={true}
                                            mb_id={verifiedMemberData._id}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                        />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"3"}>
                                    <Box className="menu_name">Following</Box>
                                    <Box className="menu_content">
                                        <MemberFollowing
                                            action_enabled={true}
                                            mb_id={verifiedMemberData._id}
                                            followRebuild={followRebuild}
                                            setFollowRebuild={setFollowRebuild}
                                        />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"4"}>
                                    <Box className={"menu_name"}>Maqola yozish</Box>
                                    <Box className={"write_content"}>
                                        <TuiEditor
                                            setValue={setValue}
                                            setArticlesRebuild={setArticleRebuild}
                                        />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"5"}>
                                    <Box className="menu_name">Tanlangan Maqola</Box>
                                    <Box className="menu_content">
                                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"6"}>
                                    <Box className="menu_name">Malumotlarni o'zgartirish</Box>
                                    <Box className="menu_content">
                                        <MySettings />
                                    </Box>
                                </TabPanel>

                            </Box>
                        </Stack>

                        <Stack className="my_page_right">
                            <Box className="order_info_box">
                                <a onClick={() => setValue("6")} className="settings_btn">
                                    <SettingsIcon />
                                </a>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <div className="order_user_img">
                                        <img style={{ objectFit: "cover" }} src={chosenMember?.mb_image ? `${serverApi}/${chosenMember.mb_image}` : "/auth/default_user.svg"} className="order_user_avatar" />
                                        <div className="order_user_icon_box">
                                            <img src={
                                                chosenMember?.mb_type === "RESTAURANT" ?
                                                    "/icons/restaurant.svg" :
                                                    "/icons/user_icon.svg"
                                            } />
                                        </div>
                                    </div>
                                    <span className="order_user_name">{chosenMember?.mb_nick}</span>
                                    <span className="order_user_prof">{chosenMember?.mb_type}</span>
                                </Box>
                                <Box className="user_media_box">
                                    <Facebook />
                                    <Instagram />
                                    <Telegram />
                                    <YouTube />
                                </Box>
                                <Box className="user_media_box">
                                    <p className="follows">Followers: {chosenMember?.mb_subscriber_cnt}</p>
                                    <p className="follows">Folliwings: {chosenMember?.mb_follow_cnt}</p>
                                </Box>
                                <p className="user_desc">{chosenMember?.mb_description ?? "qo'shimcha malumot kiritilmagan"}</p>
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
                                                    onClick={() => setValue("4")}>
                                                    Maqola Yozish
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
                                                <span>Maqolalarim</span>
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