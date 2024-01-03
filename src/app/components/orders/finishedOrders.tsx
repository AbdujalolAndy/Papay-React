import { TabPanel } from "@mui/lab"
import { Box, Stack } from "@mui/material"
import { createSelector } from "reselect"
import { retrieveFinishedOrders, retrievePausedOrders, retrieveProcessOrders } from "../../screens/OrdersPage/selector"
import { useSelector } from "react-redux"
import { serverApi } from "../../../lib/config"
import { Product } from "../../types/product"


//Redux Selector;
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
)

export default function FinishedOrders(props: any) {
    //Initilizations
    const { finishedOrders } = useSelector(finishedOrdersRetriever)
    return (
        <TabPanel value={"3"}>
            <Stack>
                {
                    finishedOrders?.map((order) => {
                        return (
                            <Box className="order_main_box">
                                <Box className="order_box_scroll">
                                    {order.order_items.map((item) => {
                                        const product: Product = order.product_data.filter((ele) => ele._id === item.product_id)[0]
                                        const image_path = `${serverApi}/${product.product_images[0]}`
                                        return (
                                            <Box className="ordersName_price">
                                                <img src={image_path} className={"orderDishImg"} />
                                                <p className="titleDish">{product.product_name}</p>
                                                <Box className="priceBox">
                                                    <p>${product.product_price}</p>
                                                    <img src="/icons/Close.svg" />
                                                    <p>{item.item_quantity}</p>
                                                    <img src="/icons/pause.svg" />
                                                    <p style={{ marginLeft: "15px" }}>${item.item_price * item.item_quantity}</p>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Box>

                                <Box className="total_price_box red_solid">
                                    <Box className="boxTotal finish_total" >
                                        <p style={{ color: "white" }}>mahsulot narxi</p>
                                        <p style={{ color: "white" }}>${order.order_total_amount - order.order_delivery_cost}</p>
                                        <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                                        <p style={{ color: "white" }}>Yetkazish hizmati</p>
                                        <p style={{ color: "white" }}>${order.order_delivery_cost}</p>
                                        <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                                        <p style={{ color: "white" }}>jami narxi</p>
                                        <p style={{ color: "white" }}>${order.order_total_amount}</p>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Stack>
        </TabPanel>

    )
}