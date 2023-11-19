import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

const chosen_list = Array.from(Array(3).keys())
export function ChosenDish() {
    return (
        <div className="chosen_dish_page">
            <Container className="dish_container">
                <Stack sx={{ position: "relative" }} alignContent={"center"} justifyContent={"center"}
                    width={"50%"}
                >
                    <Swiper
                        className={"events_info swiper-wrapper"}
                        slidesPerView={"auto"}
                        spaceBetween={30}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: true
                        }}
                    >
                        <SwiperSlide className="events_info_frame">
                            <div className="dish_img">
                                <img src={"/others/sandvich.jpg"} className={"dish_img"} />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Stack>
            </Container>
        </div>
    )
}