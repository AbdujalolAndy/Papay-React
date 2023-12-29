import React, { useRef } from "react";
import { Box, Container, Stack } from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite } from "@mui/icons-material"
import VisibilityIcon from "@mui/icons-material/Visibility";
import Marginer from "../../components/marginer";
import { Restaurant } from "../../types/user";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopRestaurants } from "./selector";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useHistory } from "react-router";


// REDUX SELECTOR
const topRestaurantsRetriever = createSelector(
    retrieveTopRestaurants,
    (topRestaurants) => ({ topRestaurants }))

export function TopRestaurants() {
    //Initilizations
    const { topRestaurants } = useSelector(topRestaurantsRetriever)
    const refs: any = useRef([])
    const history = useHistory();

    //Handlers
    const targetLikeTop = async (event: any, id: string,) => {
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

    const targetChosenRestaurant = (id: string) => {
        history.push(`/restaurant/${id}`)
    }
    return (
        <div className="top_restaurant_frame">
            <Container>
                <Stack flexDirection={'column'} alignItems={"center"} sx={{ mt: "45px" }}>
                    <Box className="category_title">TOP Restauranlar</Box>
                    <Stack flexDirection={"row"} sx={{ mt: "45px" }} m={"16px"} gap={"35px"}>
                        {topRestaurants.map((ele: Restaurant) => {
                            const image_path = `${serverApi}/${ele.mb_image}`
                            return (
                                <CssVarsProvider key={ele._id}>
                                    <Card
                                        onClick={() => targetChosenRestaurant(ele._id)}
                                        sx={{
                                            minHeight: 430,
                                            minWidth: 325,
                                            cursor: "pointer",
                                            border: "none",
                                            boxShadow: "0px 1px 5px white"
                                        }}
                                    >
                                        <CardCover >
                                            <img
                                                src={image_path}
                                                loading="lazy"
                                                style={{ objectFit: "cover" }}
                                                alt=""
                                            />
                                        </CardCover>
                                        <CardCover
                                            sx={{
                                                background:
                                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                            }}
                                        />
                                        <CardContent sx={{ justifyContent: 'flex-end' }}>
                                            <Typography level="h2" fontSize={"lg"} mb={1} textColor="#fff">
                                                {ele.mb_nick}
                                            </Typography>
                                            <Typography
                                                startDecorator={<LocationOnRoundedIcon />}
                                                textColor="neutral.300"
                                            >
                                                {ele.mb_address}
                                            </Typography>
                                        </CardContent>
                                        <CardOverflow
                                            sx={{
                                                display: "flex",
                                                gap: 1.5,
                                                borderTop: "1px solid",
                                            }}>
                                            <IconButton
                                                size="lg"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 45,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,0.4)"
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Favorite onClick={(e) => targetLikeTop(e, ele._id)} style={{
                                                    fill: ele?.me_liked && ele?.me_liked[0]?.my_favorite ? "red" : "white"
                                                }} />
                                            </IconButton>
                                            <CardContent orientation="horizontal">
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "neutral.300",
                                                        fontWeight: "md"
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
                                                        color: "neutral.300",
                                                        fontWeight: "md",
                                                        fontSize: "16px"
                                                    }}>
                                                    <div ref={(element) => (refs.current[ele._id] = element)}>
                                                        {ele.mb_likes}
                                                    </div>
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
            </Container>
        </div>
    )
}