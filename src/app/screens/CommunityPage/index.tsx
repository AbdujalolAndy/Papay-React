import React, { useState } from "react"
import { Box, Container, PaginationItem, Stack, TablePagination } from "@mui/material"
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination"
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Swiper from "swiper";
import { CommunityChats } from "./communityChats";
import TargetArticles from "./targetArticles";
import "../../../css/community.css"

const targetBoArticles = [
    { img: "/community/avatar_ex_1.jpg", name: "Martin", desc: "Shashlikga gap yo'q", date: "2023-09-13", like: 80, views: 104 },
    { name: "Shawn", desc: "Monti juda hamyon bob ekan", date: "2023-12-13", like: 8, views: 23 },
    { img: "/community/avatar_ex_2.jpg", name: "Leo", desc: "Rayhon restauranti juda pokiza", date: "2023-06-27", like: 40, views: 120 },
    { img: "/community/avatar_ex_3.jpg", name: "Andy", desc: "Burakda tekin sharbat bor ekan!", date: "2023-12-01", like: 35, views: 70 },
]

export function CommunityPage() {
    const [value, setValue] = React.useState("1");
    const [pagination, setPagination] = React.useState(1)
    const handleValue = (event: any, newValue: string) => {
        setValue(newValue)
    }
    const handlePginationChange = ((event: any, newValue: number) => {
        setPagination(newValue)
    })
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
                                    <TabPanel value="1">
                                        <TargetArticles targetBoArticles={targetBoArticles} />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <TargetArticles targetBoArticles={targetBoArticles.slice(0, 2).reverse()} />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <TargetArticles targetBoArticles={targetBoArticles.concat(targetBoArticles.slice(0, 2).reverse())} />
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <TargetArticles targetBoArticles={targetBoArticles.reverse()} />
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