import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../types/screen";

const initialState: RestaurantPageState = {
    targetRestaurants: [],
    randomRestaurants: [],
    chosenRestaurant: null,
    targetProducts: [],
    chosenProduct: null
}

const restaurantSlice = createSlice({
    name: "RestaurantPage",
    initialState,
    reducers: {
        setTargetRestaurants: (state, action) => {
            state.targetRestaurants = action.payload
        },
        setRandomRestaurants: (state, action) => {
            state.randomRestaurants = action.payload
        },
        setChosenRestaurant: (state, action) => {
            state.chosenRestaurant = action.payload
        },
        setTargetProducts: (state, action) => {
            state.targetProducts = action.payload
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload
        }
    }
})

export const {
    setTargetRestaurants,
    setRandomRestaurants,
    setChosenRestaurant,
    setChosenProduct,
    setTargetProducts
} = restaurantSlice.actions

const restaurantPageReducer = restaurantSlice.reducer
export default restaurantPageReducer