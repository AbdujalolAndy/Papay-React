import { createSlice } from "@reduxjs/toolkit";
import { OrderPageState } from "../../types/screen";

const initialState: OrderPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: []
}

const orderPageSlice = createSlice({
    name: "orderPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) => {
            state.pausedOrders = action.payload
        },
        setProcessOrders: (state, action) => {
            state.processOrders = action.payload
        },
        setFinishedOrders: (state, action) => {
            state.finishedOrders = action.payload
        }
    }
})

export const { setPausedOrders, setProcessOrders, setFinishedOrders } = orderPageSlice.actions

const orderPageReducer = orderPageSlice.reducer
export default orderPageReducer;