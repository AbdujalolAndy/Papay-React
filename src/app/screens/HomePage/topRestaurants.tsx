import React from "react";
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
import Divider from '@mui/joy/Divider';
import Marginer from "../../components/marginer";
import { Restaurant } from "../../types/user";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopRestaurants } from "./selector";
import { serviceApi } from "../../../lib/config";


// REDUX SELECTOR

export function TopRestaurants() {
    const topRestaurantsRetriever = createSelector(
        retrieveTopRestaurants,
        (topRestaurants) => ({ topRestaurants }))
    const { topRestaurants } = useSelector(topRestaurantsRetriever)
    return (
        <div className="top_restaurant_frame">
            <Container>
                <Stack flexDirection={'column'} alignItems={"center"} sx={{ mt: "45px" }}>
                    <Box className="category_title">TOP Restauranlar</Box>
                    <Stack flexDirection={"row"} sx={{ mt: "45px" }} m={"16px"} gap={"35px"}>
                        {topRestaurants.map((restaurant: Restaurant) => {
                            const image_path = `${serviceApi}/${restaurant.mb_image}`
                            return (
                                <CssVarsProvider key={restaurant._id}>
                                    <Card sx={{ minHeight: 430, minWidth: 325, cursor: "pointer", border: "none", boxShadow: "0px 1px 5px white" }}>
                                        <CardCover>
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
                                                {restaurant.mb_nick}
                                            </Typography>
                                            <Typography
                                                startDecorator={<LocationOnRoundedIcon />}
                                                textColor="neutral.300"
                                            >
                                                {restaurant.mb_address}
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
                                            >
                                                <Favorite style={{
                                                    fill: restaurant?.me_liked && restaurant?.me_liked[0]?.my_favorite ? "red" : "white"
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
                                                    {restaurant.mb_views}
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
                                                    <div>{restaurant.mb_likes}</div>
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