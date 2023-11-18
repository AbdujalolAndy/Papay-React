import React from "react";
import { Box, Container, Stack } from '@mui/material';
import { url } from "inspector";


export function BestDishes() {
    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className={"category_title"}>
                        Trendagi ovqatlar
                    </Box>
                    <Stack sx={{ mt: "43px" }} flexDirection={"row"} justifyContent={"space-between"}>
                        {[1, 2, 3, 4].map(() => {
                            return (<Stack className="dish_box" flexDirection={"column"}>
                                <Stack className="dish_img" sx={{ backgroundImage: "url('/restaurant/pitsa.jpeg')" }} justifyContent={"center"} alignItems={"center"}>
                                    <Stack className="dish_badge">
                                        <Box className={"dish_badge_info"}>Large size</Box>
                                    </Stack>
                                    <Stack className="dish_more" flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} padding={"20px"}>
                                        <Box className="dish_more_title">Batafsil ko'rish</Box>
                                        <Box><img src={"/icons/arrow_right.svg"} alt="" /></Box>
                                    </Stack>
                                </Stack>
                                <Stack className="dish_info" alignItems={'center'} justifyContent={"center"}>
                                    <Box className="dish_name">Korean Spicy Soup</Box>
                                    <Box className="dish_price">$15</Box>
                                </Stack>
                            </Stack>)
                        })}

                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}