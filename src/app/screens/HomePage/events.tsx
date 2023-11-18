import React from "react";
import { Box, Container, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);


export function Events() {
    const events = [
        {
            title: "Boyin Food ga marhamat",
            desc: "Yangicha Uslubda Yangicha Tam va Yangicha his",
            author: "Abdurahmaon Mufid",
            date: "2023/11/10",
            location: "Toshkent, Nurafshon ko'cha",
            img: "/restaurant/boyinfood.jpg"
        },
        {
            title: "Katta chegirma endi Belissimonda",
            desc: "Faqat 25~31-iyul kunlari aniq Pitsa yegani tashrif buyuring!",
            author: "BelissimodUz",
            date: "2023/07/10",
            location: "Toshkent, Chilonzor",
            img: "/restaurant/belissimo.jpg"
        },
        {
            title: "Hali his qilmagan hisni his qilmoqchimisz",
            desc: "Merhaba promo kod oraqli 50% chegirmani qo'lga kiriting!",
            author: "Chicken House",
            date: "2023/11/13",
            location: "Toshkent, Qo'yliq",
            img: "/restaurant/merhaba.jpg"
        },
        {
            title: "Yangicha yondashuv endi O'zbekistonda",
            desc: "O'zbekistondagi eng yirik ulgirji bozor.\n",
            author: "Food City",
            date: "2023/11/15",
            location: "Toshkent, Yangi Qo'yliq bozor",
            img: "/restaurant/food_city.jpg"
        }
    ]
    return (
        <div className={"events_frame"}>
            <Container sx={{ overflow: "hidden" }}>
                <Stack className={"events_main"}>
                    <Box className={"events_text"}>
                        <span className={"category_title"}>Hodisalar</span>
                    </Box>
                    <Box className="prev_next_frame">
                        <img
                            src="/icons/arrow_right.svg"
                            className={"swiper-button-prev"}
                            style={{ transform: "rotate(-180deg" }}
                        />
                        <div className="dot_frame_pagination swiper-pagination"></div>
                        <img
                            src={"/icons/arrow_right.svg"}
                            className={"swiper-button-next"}

                        />
                    </Box>
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
                        {events.map((value, number) => {
                            return (
                                <SwiperSlide className="events_info_frame">
                                    <div className="events_img">
                                        <img src={value.img} className={"events_img"} />
                                    </div>
                                    <Box className={"events_desc"}>
                                        <Box className="events_bott">
                                            <Box className="bott_left">
                                                <div className="event_title_speaker">
                                                    <strong>{value.title}</strong>
                                                    <div className="event_organizator">
                                                        <img
                                                            src={"/icons/speaker.svg"}
                                                            style={{ width: "20px", marginRight: "10px" }}
                                                        />
                                                        <p className="spec_text_author">{value.author}</p>
                                                    </div>
                                                </div>

                                                <p
                                                    className="text_desc"
                                                    style={{ marginTop: "10px" }}
                                                >
                                                    {" "}{value.desc}{" "}
                                                </p>

                                                <div
                                                    className="bott_info"
                                                    style={{ marginTop: "10px" }}
                                                >
                                                    <div
                                                        className="bott_info_main"
                                                    >
                                                        <img
                                                            src="/icons/calendar.svg"
                                                            style={{ marginRight: "10px" }}
                                                        />
                                                        {value.date}
                                                    </div>
                                                    <div className="bott_info_main">
                                                        <img
                                                            src={"/icons/location.svg"}
                                                            style={{ marginRight: "10px" }}
                                                        />
                                                        {value.location}
                                                    </div>
                                                </div>
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Stack>
            </Container>
        </div>
    )
}