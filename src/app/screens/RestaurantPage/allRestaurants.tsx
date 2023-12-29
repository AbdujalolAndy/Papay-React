import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AspectRatio, Card, CardContent, CardOverflow, CssVarsProvider, IconButton, Link, Typography, } from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CallIcon from "@mui/icons-material/Call";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Marginer from "../../components/marginer";

//Redux Imports
import { Dispatch } from "@reduxjs/toolkit";
import { Restaurant } from "../../types/user";
import { setTargetRestaurants } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { createSelector } from 'reselect'
import { retrieveTaregetRestaurants } from "./selector";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setTargetRestaurants: (data: Restaurant[]) => dispatch(setTargetRestaurants(data))
})

//Redux Selector
const targetRestaurantRetriever = createSelector(
    retrieveTaregetRestaurants,
    (targetRestaurants) => ({ targetRestaurants })
)



export function AllRestaurants() {
    //Initilizations
    const { setTargetRestaurants } = actionDispatch(useDispatch())
    const { targetRestaurants } = useSelector(targetRestaurantRetriever)
    const [targetSearchObj, setTargetSearchObj] = useState<SearchObj>({ page: 1, limit: 8, order: "mb_point" })
    const refs: any = useRef([])

    useEffect(() => {
        //Todo:for TargetRestaurant, request to backend 
        const restaurant = new RestaurantApiService();
        restaurant.getRestaurants(targetSearchObj).then(data => setTargetRestaurants(data)).catch(err => console.log(err))
    }, [targetSearchObj])
    //Handler
    const searchHandler = (category: string) => {
        targetSearchObj.page = 1;
        targetSearchObj.order = category;
        setTargetSearchObj({ ...targetSearchObj })
    }
    const handlePaginationChange = (event: any, value: number) => {
        targetSearchObj.page = value;
        setTargetSearchObj({ ...targetSearchObj })
    }

    const targetLikeHandler = async (event: any, id: string) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            const memberServiceApi = new MemberApiService();
            const like_result = await memberServiceApi.memberLikeTarget({ like_ref_id: id, group_type: 'member' })
            assert.ok(like_result, Definer.general_err1);

            if (like_result.like_status > 0) {
                event.target.style.fill = "red"
                refs.current[like_result.like_ref_id].innerHTML++
                await sweetTopSmallSuccessAlert("success", 700, false)
            } else {
                event.target.style.fill = "white"
                refs.current[like_result.like_ref_id].innerHTML--
            }
        } catch (err: any) {
            sweetErrorHandling(err).then()
        }
    }
    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className={"fil_search_box"}>
                        <Box className="fil_box">
                            <a style={{ cursor: "pointer" }}
                                onClick={() => searchHandler("mb_point")}
                            >Zo'r</a>
                            <a style={{ cursor: "pointer" }} onClick={() => searchHandler("mb_views")}>Mashhur</a>
                            <a style={{ cursor: "pointer" }} onClick={() => searchHandler("mb_likes")}>Trendagi</a>
                            <a style={{ cursor: "pointer" }} onClick={() => searchHandler("createdAt")}>Yangi</a>
                        </Box>
                        <Box className="search_big_box">
                            <form action="" className="search_form">
                                <input
                                    type="search"
                                    className="searchInput"
                                    name={"resSearch"}
                                    placeholder="Qidiruv"
                                />
                                <Button
                                    className={"button_search"}
                                    variant="contained"
                                    endIcon={<SearchIcon />}

                                >
                                    Izlash
                                </Button>
                            </form>
                        </Box>
                    </Box>
                    <Stack className={"all_res_box"}>
                        {targetRestaurants.map((value) => {
                            return (
                                <CssVarsProvider>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            minHeight: 410,
                                            minWidth: 290,
                                            mx: "17px",
                                            my: "10px"
                                        }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio={"1"}>
                                                <img src={serverApi + `/${value.mb_image}`} />
                                            </AspectRatio>
                                            <IconButton
                                                size="md"
                                                variant={"solid"}
                                                color="neutral"
                                                onClick={(e) => { e.stopPropagation(); }}
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 0,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                            >
                                                <Favorite
                                                    onClick={(e) => targetLikeHandler(e, value._id)}
                                                    style={{ fill:value?.me_liked && value?.me_liked[0]?.my_favorite ? "red" : "white" }}
                                                />
                                            </IconButton>
                                        </CardOverflow>
                                        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                                            {value.mb_nick}
                                        </Typography>
                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link
                                                href=""
                                                startDecorator={<LocationOnRoundedIcon />}
                                                textColor={"neutral.700"}
                                            >
                                                {value.mb_address}
                                            </Link>
                                        </Typography>
                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link
                                                href=""
                                                startDecorator={<CallIcon />}
                                                textColor={"neutral.700"}
                                            >
                                                {value.mb_phone}
                                            </Link>
                                        </Typography>
                                        <CardOverflow
                                            sx={{
                                                display: "flex",
                                                gap: 1.5,
                                                borderTop: "1px solid",
                                            }}>
                                            <CardContent orientation="horizontal">
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "neutral.600",
                                                        fontWeight: "600"
                                                    }}

                                                >
                                                    {value.mb_views}
                                                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>
                                                <Marginer direction="vertical" width="1" bg="#575757" />
                                                <Typography level="body-xs"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "neutral.600",
                                                        fontWeight: "md",
                                                        fontSize: "16px"
                                                    }}>
                                                    <div ref={(element) => refs.current[value._id] = element}>{value.mb_likes}</div>
                                                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>
                                            </CardContent>
                                        </CardOverflow>
                                    </Card>

                                </CssVarsProvider>
                            )
                        })}
                    </Stack>
                    <Stack className="bottom_box">
                        <img src={"/restaurant/line_img.svg"} className={"line_img"} />
                        <Pagination
                            count={targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3}
                            page={targetSearchObj.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={handlePaginationChange}
                        />
                        <img className={"line_img_two"} src={"/restaurant/line_img.svg"} />
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}