import React, { useEffect } from "react";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import "../../../css/home.css";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
    setBestRestaurants,
    setTopRestaurants,
} from "./slice";
import { Restaurant } from "../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { Recommendations } from "./recommendations";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
    setBestRestaurants: (data: Restaurant[]) => dispatch(setBestRestaurants(data)),
});

export function HomePage() {
    /** INITIALIZATIONS */
    const { setTopRestaurants, setBestRestaurants } = actionDispatch(
        useDispatch()
    );

    useEffect(() => {
        const restaurantService = new RestaurantApiService();
        restaurantService
            .getTopRestaurants()
            .then((data) => {
                setTopRestaurants(data);
            })
            .catch((err) => console.log(err));

        restaurantService
            .getRestaurants({ page: 1, limit: 4, order: "mb_point" })
            .then((data) => {
                setBestRestaurants(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="homePage">
            <Statistics />
            <TopRestaurants />
            <BestRestaurants />
            <BestDishes />
            <Advertisements />
            <Events />
            <Recommendations/>
        </div>
    );
}
