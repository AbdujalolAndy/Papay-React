import { TabPanel } from "@mui/lab"
import { Box, Button, Stack } from "@mui/material"
import { createSelector } from "reselect"
import { retrievePausedOrders } from "../../screens/OrdersPage/selector"
import { useSelector } from "react-redux"
import { Order } from "../../types/order"
import { CartItem } from "../../types/others"
import { serverApi } from "../../../lib/config"
import { Product } from "../../types/product"
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert"
import assert from "assert"
import { Definer } from "../../../lib/Definer"
import OrderServiceApi from "../../apiServices/orderApiService"

//Redux Selector 
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
)


export default function PausedOrders(props: any) {
    //Initilizations
    const { pausedOrders } = useSelector(pausedOrdersRetriever)
    const { setOrderRebuild } = props

    //Handlers
    const deleteOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            if (!localStorage.getItem("member_data")) {
                await sweetFailureProvider("Please, login first!")
            }
            let confirmation = window.confirm("Buyurtmangizni bekor qilmoqchimisz?")
            if (confirmation) {
                const orderService = new OrderServiceApi();
                await orderService.updateOrderStatus({ order_id: order_id, order_status: "DELETED" })
                setOrderRebuild(new Date())
            }
        } catch (err) {
            sweetErrorHandling(err).then()
        }
    }
    const payOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            if (!localStorage.getItem("member_data")) {
                await sweetFailureProvider("Please, login first!")
            }
            let confirmation = window.confirm("Buyurtmangizga to'lovni amalga oshirasizmi?")
            if (confirmation) {
                const orderService = new OrderServiceApi();
                await orderService.updateOrderStatus({ order_id: order_id, order_status: "Process" })
                setOrderRebuild(new Date())
            }
        } catch (err) {
            sweetErrorHandling(err).then()
        }
    }

    return (
        <TabPanel value={"1"}>
            <Stack>
                {
                    pausedOrders?.map((order: Order) => {
                        return (
                            <Box className="order_main_box">
                                <Box className="order_box_scroll">
                                    {order.order_items.map((item) => {
                                        const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0]
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
                                <Box className="total_price_box black_solid">
                                    <Box className="boxTotal">
                                        <p>mahsulot narxi</p>
                                        <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                        <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                                        <p>Yetkazish hizmati</p>
                                        <p>${order.order_delivery_cost}</p>
                                        <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                                        <p>jami narxi</p>
                                        <p>${order.order_total_amount}</p>
                                    </Box>
                                    <Button
                                        value={order._id}
                                        onClick={deleteOrderHandler}
                                        variant="contained" color={"secondary"}
                                        style={{ borderRadius: "10px" }}
                                    >
                                        BEKOR QILISH
                                    </Button>
                                    <Button
                                        onClick={payOrderHandler}
                                        value={order._id}
                                        variant="contained"
                                        sx={{
                                            background: "rgb(2, 136, 209)",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: "10px"
                                        }}
                                    >
                                        TO'LASH
                                    </Button>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Stack>
        </TabPanel>

    )
}