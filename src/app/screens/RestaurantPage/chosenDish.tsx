import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, Rating, Stack, colors } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/swiper-bundle.css"
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";

//REDUX
import { Dispatch } from "@reduxjs/toolkit";
import { Restaurant } from "../../types/user";
import { setChosenProduct, setChosenRestaurant } from "./slice";
import { Product } from "../../types/product";
import { createSelector } from "reselect"
import { retrieveChosenProduct, retrieveChosenRestaurant } from "./selector";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";



//Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data))
})

//Redux selector
const chosenRestaurantRetriever = createSelector(
    retrieveChosenRestaurant,
    (chosenRestaurant) => ({ chosenRestaurant })
)
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({ chosenProduct })
)
const chosen_list = Array.from(Array(3).keys())
export function ChosenDish() {
    //Initializations
    let { dish_id } = useParams<{ dish_id: string }>();
    const { setChosenProduct, setChosenRestaurant } = actionDispatch(useDispatch())
    const { chosenRestaurant } = useSelector(chosenRestaurantRetriever)
    const { chosenProduct } = useSelector(chosenProductRetriever)
    const [productRebuild, setProductRebuild] = useState<Date>()
    useEffect(() => {
        relatedDishHandlers().then().catch(err => console.log(err.message))
    }, [productRebuild])
    //Handlers
    const relatedDishHandlers = async () => {
        try {
            const productService = new ProductApiService();
            const product: Product = await productService.getChosenProduct(dish_id)
            setChosenProduct(product)

            const restaurantService = new RestaurantApiService();
            const restaurant = await restaurantService.chosenRestaurant(product?.restaurant_mb_id)
            setChosenRestaurant(restaurant)
        } catch (err) {
            throw err
        }
    }
    const targetLikeProduct = async (event: any) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            const memberServiceApi = new MemberApiService();
            const like_result = await memberServiceApi.memberLikeTarget({ like_ref_id: event.target.id, group_type: 'product' })
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false)
            setProductRebuild(new Date)
        } catch (err: any) {
            sweetErrorHandling(err).then()
        }
    }
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
                        {chosenProduct?.product_images.map((ele) => {
                            const img_path = `${serverApi}/${ele}`
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
                        {chosenProduct?.product_images.map((image) => {
                            const img_path = `${serverApi}/${image}`
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
                        <strong className="dish_txt">{chosenProduct?.product_name}</strong>
                        <div className="resto_name">{chosenRestaurant?.mb_nick}</div>
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
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite style={{ color: "red" }} />}
                                        checked={chosenProduct?.me_liked && !!chosenProduct?.me_liked[0]?.my_favorite}
                                        onClick={targetLikeProduct}
                                        id={chosenProduct?._id}
                                    />
                                    <span>{chosenProduct?.product_likes} ta</span>
                                </div>
                                <div
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <RemoveRedEye sx={{ mr: "10px" }} />
                                    <span>{chosenProduct?.product_views}ta</span>
                                </div>
                            </div>
                        </Box>
                        <p className="dish_desc_info">{chosenProduct?.product_description ? chosenProduct.product_description : "No description"}</p>
                        <Marginer
                            direction="horizontal"
                            height="1"
                            width="100%"
                            bg="#000000"
                        />
                        <div className="dish_price_box">
                            <span>Narx:</span>
                            <span>{chosenProduct?.product_price}$</span>
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