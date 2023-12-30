import { TabPanel } from "@mui/lab"
import { Box, Stack } from "@mui/material"
import {createSelector} from "reselect"
import { retrieveFinishedOrders, retrievePausedOrders, retrieveProcessOrders } from "../../screens/OrdersPage/selector"
import { useSelector } from "react-redux"


const finishedOrderss = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
]
//Redux Selector;
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders)=>({finishedOrders})
)

export default function FinishedOrders(props: any) {
    //Initilizations
    const {finishedOrders} = useSelector(finishedOrdersRetriever)
    return (
        <TabPanel value={"3"}>
            <Stack>
                {
                    finishedOrderss?.map((order) => {
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

                                <Box className="total_price_box red_solid">
                                    <Box className="boxTotal finish_total" >
                                        <p style={{color:"white"}}>mahsulot narxi</p>
                                        <p style={{color:"white"}}>$22</p>
                                        <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                                        <p style={{color:"white"}}>Yetkazish hizmati</p>
                                        <p style={{color:"white"}}>$2</p>
                                        <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} />
                                        <p style={{color:"white"}}>jami narxi</p>
                                        <p style={{color:"white"}}>$24</p>
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