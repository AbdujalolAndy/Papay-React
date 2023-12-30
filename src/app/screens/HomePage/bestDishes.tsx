import React, { useEffect } from "react";
import { Box, Container, Stack } from '@mui/material';
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"
import { setTrendProducts } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";


//REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
    setTrendProducts: (data: Product[]) => dispach(setTrendProducts(data))
})

//REDUX SELECTOR
const trendProductsRetriever = createSelector(
    retrieveTrendProducts,
    (trendProducts) => ({ trendProducts })
)
export function BestDishes() {
    //Initialize
    const { setTrendProducts } = actionDispatch(useDispatch())
    const { trendProducts } = useSelector(trendProductsRetriever)
    useEffect(() => {
        const productService = new ProductApiService();
        productService
            .getTargetProducts({ order: 'product_likes', page: 1, limit: 4 })
            .then(data => { setTrendProducts(data) })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className={"category_title"}>
                        Trendagi ovqatlar
                    </Box>
                    <Stack sx={{ mt: "43px" }} flexDirection={"row"} justifyContent={"space-between"}>
                        {trendProducts.map((ele: Product) => {
                            const image_url = `${serverApi}/${ele.product_images[0]}`
                            const size_volume = ele.product_collection === "drink" ? ele.product_volume + "L" : ele.product_size + " size"
                            return (
                                <Box key={ele._id} className="dish_box">
                                    <Stack className="dish_img" sx={{ backgroundImage: `url(${image_url})` }} justifyContent={"center"} alignItems={"center"}>
                                        <Stack className="dish_badge">
                                            <Box className={"dish_badge_info"}>{size_volume}</Box>
                                        </Stack>
                                        <Stack className="dish_more" flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} padding={"20px"}>
                                            <Box className="dish_more_title">Batafsil ko'rish</Box>
                                            <Box><img src={"/icons/arrow_right.svg"} alt="" /></Box>
                                        </Stack>
                                    </Stack>
                                    <Stack className="dish_info" alignItems={'center'} justifyContent={"center"}>
                                        <Box className="dish_name">{ele.product_name}</Box>
                                        <Box className="dish_price">{ele.product_price}$</Box>
                                    </Stack>
                                </Box>)
                        })}

                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}