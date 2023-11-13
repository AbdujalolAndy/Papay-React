import React from "react";
import { Box, Button, Container, CssBaseline, Stack } from '@mui/material';
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from "@mui/joy";
import CardContent from '@mui/joy/CardContent';
import { Call as CallIcon, Favorite } from "@mui/icons-material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Marginer from "../../components/marginer";

export function BestRestaurants() {
    return (
        <div className="best_restaurant_frame">
            <img src={"icons/line-group.svg"} style={{ position: "absolute", left: "6%", transform: "90deg" }} />
            <Container sx={{ mt: "153px" }}>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Zo'r restaurantlar</Box>
                    <Stack flexDirection={"row"} mt={"43px"}>
                        <CssVarsProvider>
                            <Stack flexDirection={"row"} justifyContent={"space-between"} gap={"35px"}>
                                <Card
                                    variant="outlined"
                                    sx={{ minHeight: 483, minWidth: 328 }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1">
                                            <img src={"restaurant/burak.jpeg"} />
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
                                                bottom: 45,
                                                transform: "translateY(50%)",
                                                color: "rgba(0,0,0,0.4)"
                                            }}
                                        >
                                            <Favorite style={{ fill: "white" }} />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" fontSize={"lg"} mb={1} textColor={"neutral.700"}>
                                        Texas De Brazil
                                    </Typography>
                                    <Typography sx={{ fontSize: "md", mt: 2 }}>
                                        <Link
                                            startDecorator={<LocationOnRoundedIcon />}
                                            textColor="neutral.700"
                                        >
                                            Tashkent, Yunus Abad 4-1
                                        </Link>

                                    </Typography>

                                    <Typography sx={{ mb: 2, mt: 0.5 }}>
                                        <Link
                                            startDecorator={<CallIcon />}
                                            textColor={"neutral.700"}
                                        >
                                            +99890 7314578
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
                                                    color: "neutral.300",
                                                    fontWeight: "md"
                                                }}

                                            >
                                                100
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
                                                <div>50</div>
                                                <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{ minHeight: 483, minWidth: 328 }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1">
                                            <img src={"restaurant/burak.jpeg"} />
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
                                                bottom: 45,
                                                transform: "translateY(50%)",
                                                color: "rgba(0,0,0,0.4)"
                                            }}
                                        >
                                            <Favorite style={{ fill: "white" }} />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" fontSize={"lg"} mb={1} textColor={"neutral.700"}>
                                        Texas De Brazil
                                    </Typography>
                                    <Typography sx={{ fontSize: "md", mt: 2 }}>
                                        <Link
                                            startDecorator={<LocationOnRoundedIcon />}
                                            textColor="neutral.700"
                                        >
                                            Tashkent, Yunus Abad 4-1
                                        </Link>

                                    </Typography>

                                    <Typography sx={{ mb: 2, mt: 0.5 }}>
                                        <Link
                                            startDecorator={<CallIcon />}
                                            textColor={"neutral.700"}
                                        >
                                            +99890 7314578
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
                                                    color: "neutral.300",
                                                    fontWeight: "md"
                                                }}

                                            >
                                                100
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
                                                <div>50</div>
                                                <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{ minHeight: 483, minWidth: 328 }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1">
                                            <img src={"restaurant/burak.jpeg"} />
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
                                                bottom: 45,
                                                transform: "translateY(50%)",
                                                color: "rgba(0,0,0,0.4)"
                                            }}
                                        >
                                            <Favorite style={{ fill: "white" }} />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" fontSize={"lg"} mb={1} textColor={"neutral.700"}>
                                        Texas De Brazil
                                    </Typography>
                                    <Typography sx={{ fontSize: "md", mt: 2 }}>
                                        <Link
                                            startDecorator={<LocationOnRoundedIcon />}
                                            textColor="neutral.700"
                                        >
                                            Tashkent, Yunus Abad 4-1
                                        </Link>

                                    </Typography>

                                    <Typography sx={{ mb: 2, mt: 0.5 }}>
                                        <Link
                                            startDecorator={<CallIcon />}
                                            textColor={"neutral.700"}
                                        >
                                            +99890 7314578
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
                                                    color: "neutral.300",
                                                    fontWeight: "md"
                                                }}

                                            >
                                                100
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
                                                <div>50</div>
                                                <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>
                                <Card
                                    variant="outlined"
                                    sx={{ minHeight: 483, minWidth: 328 }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1">
                                            <img src={"restaurant/burak.jpeg"} />
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
                                                bottom: 45,
                                                transform: "translateY(50%)",
                                                color: "rgba(0,0,0,0.4)"
                                            }}
                                        >
                                            <Favorite style={{ fill: "white" }} />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" fontSize={"lg"} mb={1} textColor={"neutral.700"}>
                                        Texas De Brazil
                                    </Typography>
                                    <Typography sx={{ fontSize: "md", mt: 2 }}>
                                        <Link
                                            startDecorator={<LocationOnRoundedIcon />}
                                            textColor="neutral.700"
                                        >
                                            Tashkent, Yunus Abad 4-1
                                        </Link>

                                    </Typography>

                                    <Typography sx={{ mb: 2, mt: 0.5 }}>
                                        <Link
                                            startDecorator={<CallIcon />}
                                            textColor={"neutral.700"}
                                        >
                                            +99890 7314578
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
                                                    color: "neutral.300",
                                                    fontWeight: "md"
                                                }}

                                            >
                                                100
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
                                                <div>50</div>
                                                <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </CardContent>
                                    </CardOverflow>
                                </Card>

                            </Stack>
                        </CssVarsProvider>
                    </Stack>
                </Stack>
                <Stack mt={"16px"} flexDirection={"row"} justifyContent={"flex-end"} style={{ width: "100%" }}>
                    <Button style={{ background: "#1976d2", color: "#fff" }}>
                        BARCHASINI KO’RISH
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}