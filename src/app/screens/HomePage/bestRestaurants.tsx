
import React, { useRef } from "react";
import { Box, Button, Container, CssBaseline, Stack } from '@mui/material';
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import CardContent from '@mui/joy/CardContent';
import { Call as CallIcon, Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Marginer from "../../components/marginer";
import { Restaurant } from "../../types/user";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestRestaurants } from "./selector";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router";
import { verifiedMemberData } from "../../apiServices/verify";



export function BestRestaurants() {
    //REDUX SELECTOR
    const bestRestaurantsRetriever = createSelector(
        retrieveBestRestaurants,
        (bestRestaurants) => ({ bestRestaurants }))
    //INITIALIZE
    const { bestRestaurants } = useSelector(bestRestaurantsRetriever);
    const refs: any = useRef([]);
    const history = useHistory()

    //Handlers
    const targetGetAllRestaurants = () => history.push("/restaurant")

    const targetLikeBestRestaurant = async (event: any, id: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberApiService = new MemberApiService();
            const like_result = await memberApiService.memberLikeTarget({ like_ref_id: id, group_type: "member" });
            assert.ok(like_result, Definer.general_err1);

            if (like_result.like_status > 0) {
                refs.current[like_result.like_ref_id].innerHTML++
                event.target.style.fill = "red"
                await sweetTopSmallSuccessAlert("success", 700, false)
            } else {
                refs.current[like_result.like_ref_id].innerHTML--
                event.target.style.fill = "white"
            }
        } catch (err: any) {
            sweetErrorHandling(err).then()
        }
    }

    const targetChosenRestaurant = (id: string) => history.push(`restaurant/${id}`)
    return (
        <div className="best_restaurant_frame">
            <img src={"icons/line-group.svg"} style={{ position: "absolute", left: "6%", transform: "90deg" }} />
            <Container sx={{ pt: "153px" }}>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Zo'r restaurantlar</Box>
                    <Stack flexDirection={"row"} mt={"43px"} gap={"35px"}>
                        {bestRestaurants.map((ele: Restaurant) => {
                            const image_path = `${serverApi}/${ele.mb_image}`
                            return (
                                <CssVarsProvider key={ele._id}>
                                    <Card
                                        onClick={() => targetChosenRestaurant(ele._id)}
                                        variant="outlined"
                                        sx={{ minHeight: 483, minWidth: 320 }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={image_path} />
                                            </AspectRatio>
                                            <IconButton
                                                size="lg"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 0,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,0.4)"
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Favorite
                                                    onClick={(event) => targetLikeBestRestaurant(event, ele._id)}
                                                    style={{ fill: ele?.me_liked && ele?.me_liked[0]?.my_favorite ? "red" : "white" }}
                                                />
                                            </IconButton>
                                        </CardOverflow>
                                        <Typography level="h2" fontSize={"lg"} textColor={"neutral.700"}>
                                            {ele.mb_nick}
                                        </Typography>
                                        <Typography sx={{ fontSize: "md", mb: 2 }}>
                                            <Link
                                                startDecorator={<LocationOnRoundedIcon />}
                                                textColor="neutral.700"
                                            >
                                                {ele.mb_address}
                                            </Link>

                                        </Typography>

                                        <Typography sx={{ mb: 2, mt: 0.5 }}>
                                            <Link
                                                startDecorator={<CallIcon />}
                                                textColor={"neutral.700"}
                                            >
                                                {ele.mb_phone}
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
                                                    {ele.mb_views}
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
                                                    <div
                                                        ref={(element) => (refs.current[ele._id] = element)}
                                                    >{ele.mb_likes}</div>
                                                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>
                                            </CardContent>
                                        </CardOverflow>
                                    </Card>
                                </CssVarsProvider>
                            )
                        })}
                    </Stack>
                </Stack>
                <Stack mt={"16px"} flexDirection={"row"} justifyContent={"flex-end"} style={{ width: "100%" }}>
                    <Button onClick={() => targetGetAllRestaurants()} style={{ background: "#1976d2", color: "#fff" }}>
                        BARCHASINI KO’RISH
                    </Button>
                </Stack>
            </Container>
        </div >
    )
}