import React from "react";
import { Box, Container, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);


const chosen_list = Array.from(Array(3).keys())
export function ChosenDish() {
    return (
        <div className="chosen_dish_page">
            <Container className="dish_container">
                <Swiper
                    className={"chosen_dish_slider"}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
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
            </Container>
        </div >
    )
}