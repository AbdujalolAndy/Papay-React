import { TabPanel } from "@mui/lab"
import { Box, Button, Stack } from "@mui/material"
import { createSelector } from "reselect"
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector"
import { useSelector } from "react-redux"
import { Product } from "../../types/product"
import { serverApi } from "../../../lib/config"
import assert from "assert"
import OrderServiceApi from "../../apiServices/orderApiService"
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert"
import { Definer } from "../../../lib/Definer"
import moment from "moment"

//Redux Selector
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({ processOrders })
)
export default function ProcessOrders(props: any) {
    //Initilizations
    const { processOrders } = useSelector(processOrdersRetriever)
    const { setOrderRebuild } = props
    //Handlers
    const finishedOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            if (!localStorage.getItem("member_data")) {
                await sweetFailureProvider("Please, login first!", true)
            }
            let confirmation = window.confirm("Buyurtmani olganingizni tasdiqlaysizmi?");
            if (confirmation) {
                const orderService = new OrderServiceApi();
                await orderService.updateOrderStatus({ order_id: order_id, order_status: "Finished" })
                setOrderRebuild(new Date())
            }
        } catch (err) {
            sweetErrorHandling(err).then()
        }
    }
    return (
        <TabPanel value={"2"}>
            <Stack>
                {
                    processOrders?.map((order) => {
                        return (
                            <Box className="order_main_box">
                                <Box className="order_box_scroll">
                                    {order.order_items.map((item) => {
                                        const product: Product = order.product_data.filter((ele) => ele._id === item.product_id)[0];
                                        const image_path = `${serverApi}/${product.product_images[0]}`
                                        return (
                                            <Box className="ordersName_price">
                                                <img src={image_path} className={"orderDishImg"} />
                                                <p className="titleDish">{product.product_name}</p>
                                                <Box className="priceBox">
                                                    <p>${item.item_price}</p>
                                                    <img src="/icons/Close.svg" />
                                                    <p>{item.item_quantity}</p>
                                                    <img src="/icons/pause.svg" />
                                                    <p style={{ marginLeft: "15px" }}>${item.item_price * item.item_quantity}</p>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Box>
                                <Box className="total_price_box blue_solid">
                                    <Box className="boxTotal">
                                        <p>mahsulot narxi</p>
                                        <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                        <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                                        <p>Yetkazish hizmati</p>
                                        <p>${order.order_delivery_cost}</p>
                                        <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                                        <p>Jami narxi</p>
                                        <p>${order.order_total_amount}</p>
                                    </Box>
                                    <p className="data_compl">{moment(order.createdAt).format("YYYY-MM-DD")}</p>
                                    <Button
                                        variant="contained"
                                        sx={{ background: "rgb(2, 136, 209)", color: "rgb(255, 255, 255)", borderRadius: "10px" }}
                                        value={order._id}
                                        onClick={finishedOrderHandler}
                                    >Yakunlash</Button>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Stack>
        </TabPanel>

    )
}