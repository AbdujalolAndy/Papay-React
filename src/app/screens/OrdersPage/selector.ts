
import { AppRootState } from "../../types/screen";
import {createSelector} from "reselect"

const selectOrderPage = (state:AppRootState)=>(state.orderPage);

export const retrievePausedOrders = createSelector(
    selectOrderPage,
    (OrdersPage)=>OrdersPage.pausedOrders
)

export const retrieveProcessOrders = createSelector(
    selectOrderPage,
    (OrderPage)=>OrderPage.processOrders
)

export const retrieveFinishedOrders = createSelector(
    selectOrderPage,
    (OrderPage)=>OrderPage.finishedOrders
)