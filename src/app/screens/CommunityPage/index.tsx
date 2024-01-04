import React, { useEffect, useState } from "react"
import { Box, Container, PaginationItem, Stack, TablePagination } from "@mui/material"
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination"
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CommunityChats } from "./communityChats";
import TargetArticles from "./targetArticles";
import "../../../css/community.css"
import { BoArticle, SearchBoArticle } from "../../types/boArticle";
import BoArticlesApiService from "../../apiServices/boArticlesApiService";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setTargetBoArticles } from "./slice";
import { targetBoArticlesRetrieve } from "./selector";
import { createSelector } from "reselect"

//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetBoArticles: (data: BoArticle[]) => dispatch(setTargetBoArticles(data))
})

//Redux Selector 
const retrieverTargetBoArticles = createSelector(
    targetBoArticlesRetrieve,
    (targetBoArticles) => ({ targetBoArticles })
)



export function CommunityPage() {
    //Initializations
    const [value, setValue] = useState<string>("1");
    const [pagination, setPagination] = useState<number>(1);
    const [searchBoArticle, setSearchBoArticle] = useState<SearchBoArticle>({ bo_id: "all", limit: 4, page: 1, order: "createdAt" })
    const { setTargetBoArticles } = actionDispatch(useDispatch());
    const { targetBoArticles } = useSelector(retrieverTargetBoArticles)
    const [rebuild, setRebuild] = useState<Date>(new Date())

    //Backend data
    useEffect(() => {
        const bo_articles = new BoArticlesApiService()
        bo_articles.getBoArticles(searchBoArticle).then(data => setTargetBoArticles(data))
    }, [searchBoArticle, rebuild])

    //Handlers
    const handleValue = (event: any, newValue: string) => {
        setValue(newValue)
        switch (newValue) {
            case "1":
                setSearchBoArticle({ ...searchBoArticle, bo_id: "all" })
                break;
            case "2":
                setSearchBoArticle({ ...searchBoArticle, bo_id: "celebrity" })
                break;
            case "3":
                setSearchBoArticle({ ...searchBoArticle, bo_id: "evaluation" })
                break
            case "4":
                setSearchBoArticle({ ...searchBoArticle, bo_id: "story" })
                break
        }
    }
    const handlePginationChange = ((event: any, newValue: number) => {
        setPagination(newValue);
        searchBoArticle.page = newValue
        setSearchBoArticle({ ...searchBoArticle })
    });

    return (
        <div className="community_page">
            <div className="community_frame">
                <Container sx={{ mt: "50px", mb: "50px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                        <CommunityChats />
                        <Stack
                            className="community_all_frame"
                            inputMode={"text"}
                            style={{ border: "1px solid #fff" }}
                        >
                            <TabContext value={value}>
                                <Box className="article_tabs">
                                    <Box sx={{ borderBottom: "1px solid divider" }}>
                                        <TabList
                                            onChange={handleValue}
                                            style={{ borderColor: "blue" }}
                                        >
                                            <Tab sx={{ textTransform: "uppercase" }} value="1" label="Barcha Maqolalar"></Tab>
                                            <Tab sx={{ textTransform: "uppercase" }} value="2" label="Mashhurlar"></Tab>
                                            <Tab sx={{ textTransform: "uppercase" }} value="3" label="Oshxonaga Baho"></Tab>
                                            <Tab sx={{ textTransform: "uppercase" }} value="4" label="Hikoyalar"></Tab>
                                        </TabList>
                                    </Box>
                                </Box>
                                <Box className="article_main" overflow={"hidden"}>
                                    <TabPanel value="1" >
                                        <TargetArticles targetBoArticles={targetBoArticles} setRebuild={setRebuild} />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <TargetArticles targetBoArticles={targetBoArticles} setRebuild={setRebuild}/>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <TargetArticles targetBoArticles={targetBoArticles} setRebuild={setRebuild}/>
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <TargetArticles targetBoArticles={targetBoArticles} setRebuild={setRebuild}/>
                                    </TabPanel>
                                </Box>
                                <Box className="article_bott">
                                    <Pagination
                                        page={pagination}
                                        count={5}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{
                                                    previous: ArrowBack,
                                                    next: ArrowForward
                                                }}
                                                {...item}
                                                color="secondary"
                                            />
                                        )}
                                        onChange={handlePginationChange}
                                    />
                                </Box>
                            </TabContext>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        </div>
    )
}