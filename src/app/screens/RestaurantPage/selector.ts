import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";



const selectRestaurantState = (state: AppRootState) => state.restaurantPage;

export const retrieveTaregetRestaurants = createSelector(
    selectRestaurantState,
    (RestaurantPage) => RestaurantPage.targetRestaurants
)

export const retrieveRandomRestaurants = createSelector(
    selectRestaurantState,
    (RestaurantPage) => RestaurantPage.randomRestaurants
)

export const retrieveChosenRestaurant = createSelector(
    selectRestaurantState,
    (RestaurantPage) => RestaurantPage.chosenRestaurant
)

export const retrieveTargetProducts = createSelector(
    selectRestaurantState,
    (RestarunatPage) => RestarunatPage.targetProducts
)

export const retrieveChosenProduct = createSelector(
    selectRestaurantState,
    (RestaurantPage) => RestaurantPage.chosenProduct
)