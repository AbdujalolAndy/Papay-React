import React from "react";
import { Box, Button, Checkbox, Container, Rating, Stack, colors } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/swiper-bundle.css"
import { Favorite, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";


const chosen_list = Array.from(Array(3).keys())
export function ChosenDish() {
    return (
        <div className="chosen_dish_page">
            <Container className="dish_container">
                <Stack className="chosen_dish_slider">
                    <Swiper
                        className={"dish_swiper"}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        style={{ borderRadius: "10px" }}
                    >
                        {chosen_list.map((ele, index) => {
                            const img_path = "/others/sandvich.jpg"
                            return (
                                <SwiperSlide>
                                    <img src={img_path} style={{ width: "100%", height: "100%" }} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                    <Swiper
                        style={{ width: "450px", height: "245px", marginTop: "20px" }}
                        spaceBetween={80}
                        slidesPerView={3}
                    >
                        {Array.from(Array(5).keys()).map(() => {
                            const img_path = "/others/sandvich.jpg"
                            return (
                                <SwiperSlide style={{ height: "107px", display: "flex", width: "400px", marginRight: "20px", gap: "20px" }}>
                                    <img src={img_path} style={{ borderRadius: "15px", border: "1px solid white" }} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Stack>
                <Stack className="chosen_dish_info_container">
                    <Box className="chosen_dish_info_box">
                        <strong className="dish_txt">burma kebab</strong>
                        <div className="resto_name">TexasDeBrazil</div>
                        <Box className="rating_box">
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            <div className="evaluation_box">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "20px"
                                    }}
                                >
                                    <Checkbox
                                        icon={<Favorite style={{ color: "red" }} />}
                                        checked={false}

                                    />
                                    <span>98 ta</span>
                                </div>
                                <div
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <RemoveRedEye sx={{ mr: "10px" }} />
                                    <span>90ta</span>
                                </div>
                            </div>
                        </Box>
                        <p className="dish_desc_info">Juda mazzali sandvich</p>
                        <Marginer
                            direction="horizontal"
                            height="1"
                            width="100%"
                            bg="#000000"
                        />
                        <div className="dish_price_box">
                            <span>Narx:</span>
                            <span>$11</span>
                        </div>
                        <div className="button_box">
                            <Button variant="contained">Savatga qo'shish</Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div >
    )
}