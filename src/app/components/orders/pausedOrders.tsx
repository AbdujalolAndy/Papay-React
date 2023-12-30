import { TabPanel } from "@mui/lab"
import { Box, Button, Stack } from "@mui/material"
import {createSelector} from "reselect"
import { retrievePausedOrders } from "../../screens/OrdersPage/selector"
import { useSelector } from "react-redux"

const finishedOrders = [
    [1, 2, 3],
    [1, 2, 3, 4, 5],
    [1, 2]
]
//Redux Selector 
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders)=>({pausedOrders})
)

export default function PausedOrders(props: any) {
    //Initilizations
    const {pausedOrders} = useSelector(pausedOrdersRetriever)
    return (
        <TabPanel value={"1"}>
            <Stack>
                {
                    finishedOrders?.map((order) => {
                        return (
                            <Box className="order_main_box">
                                <Box className="order_box_scroll">
                                    {order.map((item) => {
                                        const image_path = "/others/qovurma.jpeg"
                                        return (
                                            <Box className="ordersName_price">
                                                <img src={image_path} className={"orderDishImg"} />
                                                <p className="titleDish">Qovurma</p>
                                                <Box className="priceBox">
                                                    <p>$11</p>
                                                    <img src="/icons/Close.svg" />
                                                    <p>2</p>
                                                    <img src="/icons/pause.svg" />
                                                    <p style={{ marginLeft: "15px" }}>$22</p>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Box>
                                <Box className="total_price_box black_solid">
                                    <Box className="boxTotal">
                                        <p>mahsulot narxi</p>
                                        <p>$11</p>
                                        <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                                        <p>Yetkazish hizmati</p>
                                        <p>$2</p>
                                        <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                                        <p>jami narxi</p>
                                        <p>$13</p>
                                    </Box>
                                    <Button variant="contained" color={"secondary"} style={{ borderRadius: "10px" }} >BEKOR QILISH</Button>
                                    <Button variant="contained" sx={{ background: "rgb(2, 136, 209)", color: "rgb(255, 255, 255)", borderRadius: "10px" }} >TO'LASH</Button>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Stack>
        </TabPanel>

    )
}