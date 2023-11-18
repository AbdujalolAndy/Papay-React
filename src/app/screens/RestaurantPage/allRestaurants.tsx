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

export function AllRestaurants() {
    const order_list = [
        {
            img: "/restaurant/kfc.jpeg",
            title: "KFC Restaurant",
            location: "Toshkent, Eski Qo'yliq",
            call: "+99890 3445678",
            views: 30,
            likes: 40
        },
        {
            img: "/restaurant/img2.png",
            title: "Evos Restaurant",
            location: "Toshkent, Cholchinoz",
            call: "+99890 6887561",
            views: 24,
            likes: 18
        },
        {
            img: "/restaurant/Nusr.jpeg",
            title: "NusrEl Restaurant",
            location: "Toshkent, Chilonzor Metro",
            call: "+99890 3201122",
            views: 34,
            likes: 25
        },
        {
            img: "/restaurant/pizza_hut.jpeg",
            title: "Pizza Hut Restaurant",
            location: "Toshkent, Mustaqillik",
            call: "+99891 4553452",
            views: 39,
            likes: 35
        },
        {
            img: "/restaurant/steakout.jpeg",
            title: "Steakout Restaurant",
            location: "Toshkent, Eski Qo'yliq",
            call: "+99890 78954356",
            views: 20,
            likes: 18
        },
        {
            img: "/restaurant/burak.jpeg",
            title: "Burak Restaurant",
            location: "Toshkent, Yangi Avlod",
            call: "+99890 77777777",
            views: 60,
            likes: 40
        },
        {
            img: "/restaurant/kfc.jpeg",
            title: "KFC Restaurant",
            location: "Toshkent, Eski Qo'yliq",
            call: "+99890 3445678",
            views: 30,
            likes: 40
        },
        {
            img: "/restaurant/texas_de.jpeg",
            title: "Texas De Brazil Restaurant",
            location: "Toshkent, Mega Planet",
            call: "+99890 4567321",
            views: 30,
            likes: 10
        }
    ];
    console.log(order_list)
    return (
        <div className="all_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className={"fil_search_box"}>
                        <Box className="fil_box">
                            <a style={{ cursor: "pointer" }}>Zo'r</a>
                            <a>Mashhur</a>
                            <a>Trendagi</a>
                            <a>Yangi</a>
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
                        <CssVarsProvider>
                            {order_list.map((value) => {
                                return (
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            minHeight: 410,
                                            minWidth: 290,
                                            mx: "17px",
                                            my: "20px"
                                        }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio={"1"}>
                                                <img src={value.img} />
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
                                                    /*@ts-ignore*/
                                                    style={{ color: "white" }}
                                                />
                                            </IconButton>
                                        </CardOverflow>
                                        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                                            {value.title}
                                        </Typography>
                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link
                                                href=""
                                                startDecorator={<LocationOnRoundedIcon />}
                                                textColor={"neutral.700"}
                                            >
                                                {value.location}
                                            </Link>
                                        </Typography>
                                        <Typography level="body-md" sx={{ mt: 0.5, mb: 2 }}>
                                            <Link
                                                href=""
                                                startDecorator={<CallIcon />}
                                                textColor={"neutral.700"}
                                            >
                                                {value.call}
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
                                                    {value.views}
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
                                                    <div>{value.likes}</div>
                                                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                </Typography>
                                            </CardContent>
                                        </CardOverflow>
                                    </Card>
                                )
                            })}

                        </CssVarsProvider>
                    </Stack>
                    <Stack className="bottom_box">
                        <img src={"/restaurant/line_img.svg"} className={"line_img"} />
                        <Pagination
                            count={3}
                            page={1}
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
                        />
                        <img className={"line_img_two"} src={"/restaurant/line_img.svg"} />
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}